import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { RabbitMQModule } from './queue/rabbit-mq.module';
import { ArticlesService } from './articles/articles.service';

@Module({
  imports: [PrismaModule, ArticlesModule,RabbitMQModule],
  controllers: [AppController],
  providers: [AppService, ArticlesService],
})
export class AppModule {}
