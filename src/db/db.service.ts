import { HttpException, Injectable } from '@nestjs/common';
import init, { dbMap, getList } from './db';

@Injectable()
export class DbService {
  constructor() {
    init();
  }

  getNewest() {
    return getList().slice(0, 10);
  }

  getList(count: number, offset: number) {
    return getList().slice(offset, offset + count);
  }

  getComicCount() {
    return dbMap.size;
  }

  getDbMapVal(id: number) {
    const comic = dbMap.get(id);
    if (!comic) throw new HttpException('comic not found!', 404);
    return comic;
  }
}
