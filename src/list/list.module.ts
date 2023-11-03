import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [ListController],
  providers: [ListService, DbService],
})
export class ListModule {}
