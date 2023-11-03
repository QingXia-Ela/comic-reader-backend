import { Controller, Get, Optional, ParseIntPipe, Query } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Range } from './decorator/LimitRange.decorator';

@Controller('list')
export class ListController {
  constructor(private dbService: DbService) { }
  @Get('newest')
  getNewest(@Query('count') count: number) {
    return this.dbService.getNewest();
  }

  @Get()
  getList(
    @Query('count', ParseIntPipe) @Range([1, 20]) count: number,
    @Query('offset', ParseIntPipe) @Optional() offset = 0,
  ) {
    const list = this.dbService.getList(count, offset);
    return {
      hasMore: list.length + offset < this.dbService.getComicCount(),
      data: list,
    };
  }
}
