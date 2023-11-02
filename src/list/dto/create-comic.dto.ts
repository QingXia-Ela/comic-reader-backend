import { CreateBasicComicDto } from './create-basic-comic.dto';

export class CreateComicDto extends CreateBasicComicDto {
  imgList: string[];
}
