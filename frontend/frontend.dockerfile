FROM node:22.17.1 AS frontend

WORKDIR /app
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install
RUN npm run build
RUN npm install serve -g

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
