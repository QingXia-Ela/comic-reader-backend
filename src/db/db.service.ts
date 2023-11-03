import { HttpException, Injectable } from '@nestjs/common';
import init, { dbMap, getList } from './db';

init();

@Injectable()
export class DbService {
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
    const comic = dbMap.get(parseInt(id.toString()));
    if (!comic) throw new HttpException('comic not found!', 404);
    return comic;
  }
}
