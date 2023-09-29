import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as AFINN from './afinn.json';

// Função para dividir o texto em palavras
const tokenize = text => text.toLowerCase().split(" ");

// Função para remover caracteres não alfanuméricos de uma palavra
const deleteUselessChars = word => word.replace(/[^\w]/g, "");

// Função para atribuir uma pontuação a uma palavra com base no dicionário AFINN
const rateWord = word => (word in AFINN ? AFINN[word] : 0);

// Função para somar pontuações de palavras em um texto
const sum = (x, y) => x + y;

// Função para analisar um texto e atribuir uma pontuação geral
const analyseText = text =>
  tokenize(text)
    .map(deleteUselessChars)
    .map(rateWord)
    .reduce(sum);

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // Método para criar um novo artigo
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  // Método para encontrar rascunhos de artigos
  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  // Método para encontrar todos os artigos publicados
  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  // Método para encontrar um artigo por ID
  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  // Método para atualizar um artigo por ID
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  // Método para remover um artigo por ID
  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }

  // Método para avaliar um texto com base em sua pontuação
  rate(body: string) {
    return analyseText(body);
  }
}
