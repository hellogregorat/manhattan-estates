#!/bin/sh
set -e

echo "Применяю миграции базы данных..."
npx prisma migrate deploy

echo "Запускаю сервер..."
node server.js
