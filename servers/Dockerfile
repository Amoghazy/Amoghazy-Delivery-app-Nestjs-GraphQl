FROM node:20.16.0-bookworm-slim AS builder
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build users

FROM node:20.16.0-bookworm-slim AS production
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/server
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/.env ./
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/apps/users/main"]
