FROM node:22.17.1 AS frontend

WORKDIR /app
COPY . .
RUN npm install
RUN VITE_API_URL=http://88.210.9.124:5555/ npm run build
RUN npm install serve -g
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]