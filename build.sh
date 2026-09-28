mkdir -p "$(dirname "$DB_FILE_NAME")"

npm run db:migrate
npm run db:seed
npm run build
