import { Controller, Get, Param } from '@nestjs/common';

@Controller('img')
export class ImgController {
  @Get(':id/:img')
  getImg(@Param() { id, img }) {
    return '';
  }
}
