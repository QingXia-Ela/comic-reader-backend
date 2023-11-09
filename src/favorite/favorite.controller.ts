import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Get('list')
  getFavoriteList() {
    return this.favoriteService.getFavoriteList();
  }

  @Get('add')
  add(@Query('id', ParseIntPipe) id: number) {
    return this.favoriteService.add(id);
  }

  @Get('remove')
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.favoriteService.remove(id);
  }

  @Get('isFavorite')
  isFavorite(@Query('id', ParseIntPipe) id: number) {
    return this.favoriteService.isFavorite(id);
  }
}
