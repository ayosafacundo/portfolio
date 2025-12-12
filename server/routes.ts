import type { Express } from "express";
import { type Server } from "http";
import {getEverything, postMessage} from "./pqquerys";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/api/data', getEverything);
  app.post('/api/contact', postMessage);

  return httpServer;
}
