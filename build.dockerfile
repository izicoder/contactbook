FROM node:22.17.1 AS builder

WORKDIR /app
COPY . .
RUN chmod +x ./build.sh && ./build.sh

FROM node:22.17.1 AS frontend

RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build/frontend ./frontend
EXPOSE 5173
CMD ["serve", "-s", "frontend", "-l", "5173"]

FROM node:22.17.1 AS backend

WORKDIR /app
COPY --from=builder /app/build/backend .
EXPOSE 3000
CMD ["node", "dist/index.js"]
