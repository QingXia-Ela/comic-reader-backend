import * as fs from 'fs-extra';
import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import settingsCustom from 'settings.custom';
import { DbService } from 'src/db/db.service';

@Controller('img')
export class ImgController {
  constructor(private dbService: DbService) {}
  @Get(':id/:img')
  async getImg(@Param() { id, img }, @Res() res: Response) {
    const path = settingsCustom.crypto.active
      ? `${this.dbService.getDbMapVal(id).title}/encrypted/${img}.buf`
      : `${this.dbService.getDbMapVal(id).title}/${img}`;
    try {
      await fs.lstat(`book/${path}`);
    } catch (e) {
      throw new HttpException('img not found', 404);
    }
    res.setHeader('cache-control', 'max-age=30000');
    if (settingsCustom.crypto.active)
      res.setHeader('content-type', 'application/octet-stream');
    res.sendFile(path, {
      root: 'book',
    });
  }
}
