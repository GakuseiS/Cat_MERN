# Проект Cat Energy для демонстрационных целей

## Запуск

1. Установка зависимостей yarn install, cd client, yarn install;
2. Создать в корне файл .env, поместить туда DATABASE_URL для prisma;
3. Накатить миграции npx prisma migrate dev;
4. Старт проекта для разработки/теста yarn dev.
   Опционально:
5. Запуск только сервера в режиме разработки yarn server:dev;
6. Запуск production build'a yarn start.
