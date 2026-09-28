echo "DB_FILE_NAME=$DB_FILE_NAME"
mkdir -p /var/data && npm run db:migrate && npm run build
