import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import settingsCustom from 'settings.custom';
import { DbService } from 'src/db/db.service';

@Controller('img')
export class ImgController {
  constructor(private dbService: DbService) {}
  @Get(':id/:img')
  getImg(@Param() { id, img }, @Res() res: Response) {
    // return readFile(`book/${this.dbService.getDbMapVal(id).title}/${img}`);
    return new Promise<void>((resolve, rej) => {
      res.setHeader('cache-control', 'max-age=30000');
      if (settingsCustom.crypto.active) {
        res.setHeader('content-type', 'application/octet-stream');
        res.sendFile(
          `${this.dbService.getDbMapVal(id).title}/encrypted/${img}.buf`,
          {
            root: 'book',
          },
          (err) => {
            if (err) rej(new HttpException('img not found', 404));
            resolve();
          },
        );
      } else {
        res.sendFile(
          `${this.dbService.getDbMapVal(id).title}/${img}`,
          {
            root: 'book',
          },
          (err) => {
            if (err) rej(new HttpException('img not found', 404));
            resolve();
          },
        );
      }
    });
  }
}
