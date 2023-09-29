
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

## Uso do RabbitMQ para Análise de Sentimento

- Neste projeto, utilizamos o RabbitMQ como um sistema de mensageria assíncrona para realizar análise de sentimento em texto. Veja como funciona:
- Quando um novo artigo é criado através do endpoint /articles, os dados do artigo são enviados como uma mensagem para uma fila RabbitMQ chamada rabbit-mq-nest-js.
- Um processo separado, possivelmente em outra parte da sua aplicação ou em um servidor diferente, fica escutando na fila rabbit-mq-nest-js.
- Quando uma mensagem é recebida da fila, o processo obtém os dados do artigo a partir da mensagem e realiza análise de sentimento no conteúdo, título ou informações relevantes do artigo.
- Os resultados da análise de sentimento podem ser usados para diversos fins, como categorizar artigos com base no sentimento ou fornecer pontuações de sentimento aos usuários.

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
