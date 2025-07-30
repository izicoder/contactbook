#!/bin/bash

# Exit on any error
set -e

echo "Starting frontend"
(cd frontend && npm install && VITE_API_URL=http://localhost:5555 npm run dev) &

echo "Starting backend"
(cd backend && npm install && npm run dev) &

# Wait for both background jobs to finish
wait
