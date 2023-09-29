
# Api-nestjs

## Installation

1. **Clone the repository**:

   git clone https://github.com/Gabrielbm2/Api-nestjs.git

2. **Install dependencies**:

   npm install

3. **Set up PostgreSQL**:

   Create a PostgreSQL database and set the connection URL in your `.env` file:

   DATABASE_URL=postgresql://username:password@localhost:5432/your-database-name

4. **Start the application**:

   npm run start

## Usage

Explain how to use your project once it's installed.

## API Endpoints

- Create an Article: `POST /articles`
- Get All Articles: `GET /articles`
- Get Draft Articles: `GET /articles/drafts`
- Get Article by ID: `GET /articles/:id`
- Update Article by ID: `PATCH /articles/:id`
- Delete Article by ID: `DELETE /articles/:id`

## Prerequisites

- Node.js and npm installed.
- PostgreSQL database configured.
- RabbitMQ server running (configure URL in the code).

## Technologies Used

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/)