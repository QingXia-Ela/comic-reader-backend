import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import settingsCustom from 'settings.custom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: settingsCustom.https ?? undefined,
  });
  app
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Hentai-Comic-Reader-Backend')
    .setDescription('Hentai-Comic-Reader-Backend API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(settingsCustom.server.port);
}
bootstrap();
