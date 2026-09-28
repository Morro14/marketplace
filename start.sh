sh -c "mkdir -p /var/data &&
  npm run db:seed &&
  npm run db:migrate
"
