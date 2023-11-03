import { Controller, Get, Optional, ParseIntPipe, Query } from '@nestjs/common';

@Controller('list')
export class ListController {
  @Get('newest')
  getNewest(@Query('count') count: number) {
    return [];
  }

  @Get()
  getList(
    @Query('count', ParseIntPipe) count: number,
    @Query('offset') @Optional() offset: number,
  ) {
    return {
      hasMore: false,
      data: [],
    };
  }
}
