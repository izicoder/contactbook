
# Navigate to frontend and run in background
cd frontend || { echo "Frontend directory not found"; exit 1; }
npm run dev &
FRONTEND_PID=$!

# Navigate to backend and run in background
cd ../backend || { echo "Backend directory not found"; exit 1; }
npm run dev &
BACKEND_PID=$!

# Wait for both processes
wait $FRONTEND_PID
wait $BACKEND_PID
