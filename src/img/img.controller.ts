import { Controller, Get } from '@nestjs/common';

@Controller('img')
export class ImgController {
  @Get(':id/:img')
  getImg(id: number, img: string) {
    return '';
  }
}
