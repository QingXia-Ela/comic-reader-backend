import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import settingsCustom from 'settings.custom';
import { DbService } from 'src/db/db.service';

@Controller('img')
export class ImgController {
  constructor(private dbService: DbService) {}
  @Get(':id/:img')
  getImg(@Param() { id, img }, @Res() res: Response) {
    // return readFile(`book/${this.dbService.getDbMapVal(id).title}/${img}`);
    res.setHeader('cache-control', 'max-age=2400');
    if (settingsCustom.crypto.active) {
      res.setHeader('content-type', 'application/octet-stream');
      return res.sendFile(
        `${this.dbService.getDbMapVal(id).title}/encrypted/${img}.buf`,
        {
          root: 'book',
        },
      );
    } else {
      return res.sendFile(`${this.dbService.getDbMapVal(id).title}/${img}`, {
        root: 'book',
      });
    }
  }
}
