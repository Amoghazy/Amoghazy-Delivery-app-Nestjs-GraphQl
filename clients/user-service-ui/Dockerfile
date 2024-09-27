FROM node:20.16.0-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

ENV NEXT_PUBLIC_ESLINT_IGNORE duringBuild
RUN npm run build
#############################################3
FROM node:20.16.0-bookworm-slim AS production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
