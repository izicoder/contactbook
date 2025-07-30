### Small contact book SPA

#### Built with

-   Express.js;
-   Vite;
-   LowDB;
-   React.js;
-   Typescript;
-   libphonenumber-js;

#### Usage

Requires node.js version 22 and linux environment

How to build:

`git clone https://github.com/izicoder/contactbook`

`cd contactbook`

`./build.sh`

Run for backend

`node build/backend/dist/index.js`

Run for frontend

`npx serve build/frontend/dist`

#### With docker

`git clone https://github.com/izicoder/contactbook`

`cd contactbook`

Replace VITE_API_URL in docker-compose.yml with your hostname or ip, then

`docker-compose up -d`

#### Demo at http://88.210.9.124:5173
