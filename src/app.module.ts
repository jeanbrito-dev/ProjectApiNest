import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProdutoModule, PrismaModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
