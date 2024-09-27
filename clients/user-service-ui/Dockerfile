# Stage 1: Build
FROM node:20.16.0-bookworm-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Run Prisma generate
RUN npx prisma generate

# Set environment variable using the correct format
ENV NEXT_PUBLIC_ESLINT_IGNORE=durinBuild

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20.16.0-bookworm-slim AS production

WORKDIR /app

# Copy built files and necessary dependencies from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Set the production environment
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
