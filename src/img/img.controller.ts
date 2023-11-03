import { Controller, Get, Param } from '@nestjs/common';
import { readFile } from 'fs-extra';
import { DbService } from 'src/db/db.service';

@Controller('img')
export class ImgController {
  constructor(private dbService: DbService) {}
  @Get(':id/:img')
  getImg(@Param() { id, img }) {
    return readFile(`book/${this.dbService.getDbMapVal(id).title}/${img}`);
  }
}
