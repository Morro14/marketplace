sh -c "mkdir -p /var/data &&
  npm run db:migrate &&
  npm run db:seed
"
