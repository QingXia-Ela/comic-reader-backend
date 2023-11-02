import { Controller, Get, Query } from '@nestjs/common';

@Controller('list')
export class ListController {
  @Get('newest')
  getNewest() {
    return [];
  }

  @Get()
  getList(@Query('count') count: number, @Query('offset') offset: number) {
    return [];
  }
}
