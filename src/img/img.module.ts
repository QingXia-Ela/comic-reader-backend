import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [ImgController],
  providers: [DbService],
})
export class ImgModule {}
