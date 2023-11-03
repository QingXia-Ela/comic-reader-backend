import { Controller, Get, Param } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Controller('comic')
export class ComicController {
  constructor(private dbService: DbService) {}
  @Get(':id')
  getComic(@Param() { id }) {
    return this.dbService.getDbMapVal(id);
  }
}
