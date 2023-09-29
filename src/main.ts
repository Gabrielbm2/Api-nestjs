// Importações necessárias
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

// Função assíncrona para inicialização da aplicação
async function bootstrap() {
  // Cria uma instância da aplicação NestJS
  const app = await NestFactory.create(AppModule);

  // Conecta a aplicação a um serviço de mensagens RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://guest:guest@localhost:5672/'
      ],
      queue: 'rabbit-mq-nest-js',
      // false = reconhecimento manual; true = reconhecimento automático
      noAck: true,
      // Obtém uma mensagem por vez
      prefetchCount: 1
    }
  });

  // Configuração da documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  // Criação e configuração do documento Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicializa todos os microservices
  await app.startAllMicroservices();

  // Inicializa a aplicação na porta 3000
  await app.listen(3000);
}

// Chama a função de inicialização
bootstrap();
