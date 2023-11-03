import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();