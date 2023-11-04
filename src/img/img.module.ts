import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ImgController } from './img.controller';
import { DbService } from 'src/db/db.service';
import { StaticFileMiddlware } from './middleware/static-file.middleware';

@Module({
  controllers: [ImgController],
  providers: [DbService],
})
export class ImgModule {}
