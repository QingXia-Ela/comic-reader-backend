import { Injectable } from '@nestjs/common';
import { dbMap } from 'src/db/db';
import getSimplifyComic from 'src/list/utils/getSimplifyComic';

@Injectable()
export class SearchService {
  getList(keywords: string[]) {
    // return [];
    return Array.from(dbMap.values())
      .filter((comic) => {
        return keywords.every((keyword) => {
          return (
            comic.tags.includes(keyword) || comic.authors.includes(keyword)
          );
        });
      })
      .map(getSimplifyComic);
  }

  getComic(id: number) {
    return getSimplifyComic(dbMap.get(id));
  }
}
