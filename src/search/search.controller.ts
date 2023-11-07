import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ComicBasic } from 'src/list/interface/comic-basic.interface';
import { SearchService } from './search.service';

const ID_REG = /^m/gi;

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  search(@Query('keywords') keywords: string): ComicBasic[] {
    return this.searchService.getList(keywords.split(' '));
  }

  @Get()
  searchById(@Query('id') id: string): ComicBasic {
    if (ID_REG.test(id)) {
      return this.searchService.getComic(parseInt(id.slice(1)));
    }
    throw new HttpException('Invalid id', 400);
  }
}
