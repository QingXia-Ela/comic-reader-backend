import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UseGuards,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { DbService } from './db/db.service';
import { ListModule } from './list/list.module';
import { ImgModule } from './img/img.module';
import { ComicModule } from './comic/comic.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SearchModule } from './search/search.module';
import { AppGuard } from './app.guard';
import { GuardMiddleware } from './common/middleware/guard.middleware';

@Module({
  imports: [ListModule, ImgModule, ComicModule, SearchModule],
  controllers: [AppController, LoginController],
  providers: [AppService, DbService],
})
@UseGuards(AppGuard)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GuardMiddleware)
      .forRoutes('*')
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
