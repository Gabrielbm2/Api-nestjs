import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesService } from './articles/articles.service';
import { error } from 'console';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
              private readonly articlesService: ArticlesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('createArticle')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    this.articlesService.update(data.message.id, {emotion:this.articlesService.rate(data.message.body)})
  }
}
