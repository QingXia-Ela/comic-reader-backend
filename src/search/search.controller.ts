import { Controller, Get, Query } from '@nestjs/common';
import { ComicBasic } from 'src/list/interface/comic-basic.interface';

@Controller('search')
export class SearchController {
  @Get()
  search(@Query('keyword') keyword: string): ComicBasic[] {
    return [];
  }
}
