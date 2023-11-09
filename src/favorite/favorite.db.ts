import * as fs from 'fs-extra';

export default class FavoriteDb {
  FavoriteSet: Set<number>;

  constructor() {
    this.FavoriteSet = new Set(this._readDB());
  }

  private _writeDB() {
    fs.writeJSONSync('./book/favorite.db.json', Array.from(this.FavoriteSet), {
      spaces: 2,
      EOL: '\n',
    });
  }

  private _readDB() {
    fs.ensureDirSync('./book');
    try {
      return fs.readJSONSync('./book/favorite.db.json');
    } catch (e) {
      this._writeDB();
    }
    return [];
  }

  addFavorite(id: number) {
    const res = this.FavoriteSet.add(id);
    this._writeDB();
    return res;
  }

  removeFavorite(id: number) {
    const res = this.FavoriteSet.delete(id);
    this._writeDB();
    return res;
  }

  isFavorite(id: number) {
    return this.FavoriteSet.has(id);
  }

  getFavoriteList() {
    return Array.from(this.FavoriteSet);
  }
}
