# Stage 1: Build the Angular application
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the application using Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/dist/valor-growth /app/dist/valor-growth
COPY --from=builder /app/server.ts /app/server.ts
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["node", "server.ts"]