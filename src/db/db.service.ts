import { Injectable } from '@nestjs/common';
import init from './db';

@Injectable()
export class DbService {
  constructor() {
    init();
  }
}
