import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import getSimplifyComic from './utils/getSimplifyComic';

@Injectable()
export class ListService {
  constructor(private dbService: DbService) {}
  getNewest(count: number) {
    return this.dbService.getNewest().map(getSimplifyComic);
  }

  getList(count: number, offset: number) {
    const list = this.dbService.getList(count, offset);
    return {
      hasMore: list.length + offset < this.dbService.getComicCount(),
      data: list.map(getSimplifyComic),
      total: this.dbService.getComicCount(),
    };
  }
}
