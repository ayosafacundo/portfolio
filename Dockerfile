# --- STAGE 1: Install Global Dependencies & Build Frontend ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the root package files (includes all dependencies)
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code (backend, frontend, configs)
COPY . .

# Build the Vite React Frontend
# We run the build command from the root context
WORKDIR /app/client
RUN npm run build # Output will be in /app/client/dist

# --- STAGE 2: Final Production Image (Lean & Secure) ---
FROM node:20-alpine

# Set the working directory for the application
WORKDIR /app

# Copy only the necessary files for the final runtime:
# 1. The built backend dependencies (from the root node_modules)
COPY --from=builder /app/node_modules ./node_modules/

# 2. The backend source code
COPY server/ ./server/

# 3. The built frontend assets (copied into a specific backend folder for serving)
COPY --from=builder /app/client/dist ./server/client-dist

# 4. Copy the root package.json (needed for npm start/scripts) and .env file
COPY package.json .env ./
COPY .env ./server/ # It is often necessary to copy .env into the server folder

# Set the entry directory to the server folder
WORKDIR /app/server

# Set environment variable for Express port
ENV PORT 5000

# Expose the internal port (Express listens here)
EXPOSE 5000

# Command to run the Express server
# Adjust "index.js" if your entry file is different
CMD ["node", "index.js"]