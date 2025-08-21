#!/bin/bash

# This is to start the front-end application
echo "Starting front-end application..."

# To move to the directory where the front-end code is located
cd PumpOS-Frontend || exit 1

# To install dependencies and build the application
npm install || { echo "npm install failed"; exit 1; }
npm run build

# To start the application in preview mode
npm run preview