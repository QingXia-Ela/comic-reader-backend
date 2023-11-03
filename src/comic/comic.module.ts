import { Module } from '@nestjs/common';
import { ComicController } from './comic.controller';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [],
  controllers: [ComicController],
  providers: [DbService],
})
export class ComicModule {}
