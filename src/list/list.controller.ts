import { Controller, Get, Optional, ParseIntPipe, Query } from '@nestjs/common';
import { Range } from './decorator/LimitRange.decorator';
import { ListService } from './list.service';

@Controller({
  path: 'list',
})
export class ListController {
  constructor(private listService: ListService) {}
  @Get('newest')
  getNewest(@Query('count') count: number) {
    return this.listService.getNewest(count);
  }

  @Get()
  getList(
    @Query('count', ParseIntPipe) @Range([1, 20]) count: number,
    @Query('offset', ParseIntPipe) @Optional() offset = 0,
  ) {
    return this.listService.getList(count, offset);
  }
}
