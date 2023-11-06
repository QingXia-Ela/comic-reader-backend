import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  encrypto(data: string) {
    return data;
  }

  encryptoList(data: string[]) {
    return data;
  }
}
