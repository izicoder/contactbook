FROM node:22.17.1 AS backend

WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc
EXPOSE 5555
CMD ["node", "dist/index.js"]