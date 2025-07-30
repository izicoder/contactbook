#!/bin/bash
set -e

echo "Building frontend (Vite)..."
cd frontend
npm install
VITE_API_URL=http://localhost:5555 npm run build
mkdir -p ../build/frontend
cp -r dist ../build/frontend

echo "Installing backend deps and building TypeScript..."
cd ../backend
npm install
npx tsc
mkdir -p ../build/backend
cp -r dist ../build/backend
cp -r node_modules ../build/backend

echo "Production build complete."
