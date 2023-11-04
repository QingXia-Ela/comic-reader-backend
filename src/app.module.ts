import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { LoginController } from './login/login.controller';
import { DbService } from './db/db.service';
import { ListModule } from './list/list.module';
import { ImgModule } from './img/img.module';
import { ComicModule } from './comic/comic.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [ListModule, ImgModule, ComicModule],
  controllers: [AppController, SearchController, LoginController],
  providers: [AppService, DbService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
