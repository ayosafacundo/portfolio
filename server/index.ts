import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { Pool } from "pg";
import "dotenv/config.js";

const app = express();
const httpServer = createServer(app);

export let pg: Pool;

function initializeDatabasePool() {
  const user: string = process.env.POSTGRES_USER || "";
  const password: string = process.env.POSTGRES_PASSWORD || "";
  const host: string = process.env.POSTGRES_HOST || "";
  const port: number = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 0;
  const database: string = process.env.POSTGRES_DB || "";
  if (!user && !password && !host && !port && !database) {
    log("POSTGRES_URL is UNDEFINED. Check your .env file and loading order.", "postgresql")
    return false;
  }
  pg = new Pool({
    user,
    password,
    host,
    port,
    database,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 30000
  });
  pg.on("error", (err: Error) => {
    log("Unexpected error on idle PostgreSQL client: " + err, "postgresql");
    console.error(err);
    return false;
  });
  return true;
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      log(logLine, "api");
    }
  });

  next();
});

setInterval(async () => {
  try {
    const client = await pg.connect();
    client.release();
    const time = Date.now().toLocaleString();
    log("PostgreSQL connection is healthy.", "postgresql");
  } catch (err) {
    log("Error checking PostgreSQL connection: " + err, "postgresql");
    
  }
}, 5 * 60 * 1000); // every 5 minutes

process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await pg.end();
  process.exit(0);
});

(async () => {
  await registerRoutes(httpServer, app);
  if (!await initializeDatabasePool()) {
    log("Fatal error initializing database pool. Aborting.", "expressjs");
    return;
  }
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "localhost";
  httpServer.listen(
    {
      port,
      host
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
