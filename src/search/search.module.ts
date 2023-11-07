import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [DbService, SearchService],
})
export class SearchModule {}
