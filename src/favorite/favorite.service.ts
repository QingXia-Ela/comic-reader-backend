import { Injectable } from '@nestjs/common';
import { dbMap, isExist } from 'src/db/db';
import FavoriteDb from './favorite.db';
import getSimplifyComic from 'src/list/utils/getSimplifyComic';

const DB = new FavoriteDb();

@Injectable()
export class FavoriteService {
  add(id: number) {
    isExist(id);
    DB.addFavorite(id);
    return true;
  }

  remove(id: number) {
    isExist(id);
    DB.removeFavorite(id);
    return true;
  }

  isFavorite(id: number) {
    return DB.isFavorite(id);
  }

  getFavoriteList() {
    return DB.getFavoriteList()
      .map((id) => dbMap.get(id))
      .map(getSimplifyComic);
  }
}
