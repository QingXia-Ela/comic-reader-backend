import { Module, UseInterceptors } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListController } from './list/list.controller';
import { SearchController } from './search/search.controller';
import { LoginController } from './login/login.controller';
import { ImgController } from './img/img.controller';
import { TransformInterceptor } from './interceptor/transform.interceptor';

@Module({
  imports: [],
  controllers: [
    AppController,
    ListController,
    SearchController,
    LoginController,
    ImgController,
  ],
  providers: [AppService],
})
export class AppModule { }
