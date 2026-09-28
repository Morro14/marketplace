#!/bin/sh
set -e

echo "Starting application..."
echo "DB_FILE_NAME=$DB_FILE_NAME"

mkdir -p "$(dirname "$DB_FILE_NAME")"

npm run db:migrate
npm run db:seed

exec npm run start
