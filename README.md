# time2move-server

Backend API for the time2move application, built with Node.js, Express, TypeScript, and Prisma ORM.

## Features

- RESTful API for managing workouts and sessions
- PostgreSQL database via Prisma ORM
- TypeScript for type safety
- Environment variable support with dotenv
- CORS and logging middleware

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://github.com/motdotla/dotenv)
- [CORS](https://github.com/expressjs/cors)
- [Morgan](https://github.com/expressjs/morgan)

## Project Structure

```
src/
  controllers/   # Express route handlers
  routes/        # API route definitions
  prisma/        # Prisma schema and migrations
  index.ts       # Entry point
generated/
  prisma/        # Generated Prisma client
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string

## Linting

- ESLint is configured. Run `npx eslint .` to lint code.

## API Endpoints

- `/workouts` - CRUD for workouts
- `/sessions` - CRUD for sessions

See the source code for detailed endpoint documentation.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

[MIT](LICENSE)

---
