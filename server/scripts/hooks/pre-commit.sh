#!/bin/sh

# Change this to the path of your file
FILE="server/config.js"

# Check if the environment variable in your file is set to process.env.ENVIRONMENT
if ! grep -q 'const environment = process.env.ENVIRONMENT;' "$FILE"; then
  echo "Can only commit when environment is set to process.env.ENVIRONMENT"
  exit 1
fi

# Change this to the path of your file
FILE="client/src/config.js"

# Check if the environment variable in your file is set to process.env.ENVIRONMENT
if ! grep -q 'const environment = process.env.REACT_APP_ENVIRONMENT;' "$FILE"; then
  echo "Can only commit when environment is set to process.env.REACT_APP_ENVIRONMENT"
  exit 1
fi


# Change this to the path of your file
FILE="server/background/monthly_worker.js"

# Check if the date check in your file is commented out
if grep -q '// if (today.getDate() === 1) {' "$FILE"; then
  echo "Cannot commit because if (today.getDate() === 1) { in background/monthly_worker.ts is commented out"
  exit 1
fi

# Change this to the path of your file
FILE="server/background/weekly_worker.js"

# Check if the date check in your file is commented out
if grep -q '// if (today.getDay() === 5) {' "$FILE"; then
  echo "Cannot commit because if (today.getDay() === 1) { in background/weekly_worker.ts check is commented out"
  exit 1
fi