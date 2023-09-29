import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { RabbitMQService } from 'src/queue/rabbit-mq.service';
import { error } from 'console';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  // Rota para criar um novo artigo
  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    // Crie um artigo e envie uma mensagem para a fila RabbitMQ
    const article =  this.articlesService.create(createArticleDto).then((article) => {
        this.rabbitMQService.send('createArticle', {
          message: article,
        });
    });
    return article;
  }

  // Rota para obter todos os artigos
  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  // Rota para obter rascunhos de artigos
  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  // Rota para obter um artigo por ID
  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  // Rota para atualizar um artigo por ID
  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  // Rota para excluir um artigo por ID
  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
