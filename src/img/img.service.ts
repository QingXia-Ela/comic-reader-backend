import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

const cache = new Map();

@Injectable()
export class ImgService {
  constructor(private dbService: DbService) {}

  getImg(id: number, img: string) {
    const comic = this.dbService.getDbMapVal(id);
    // if (comic)
    // console.log(comic.);
  }
}
