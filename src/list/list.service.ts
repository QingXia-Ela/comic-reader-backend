import { Injectable } from '@nestjs/common';

@Injectable()
export class ListService {
  getNewest(count: number) {
    return [];
  }

  getList(count: number, offset: number) {
    return {
      hasMore: false,
      data: [],
    };
  }
}
