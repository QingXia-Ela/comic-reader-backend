import { CreateBasicComicDto } from './create-basic-comic.dto';

export class CreateComicDto extends CreateBasicComicDto {
  constructor({ imgList, ...props }) {
    super(props);
    this.imgList = imgList;
  }
  imgList: string[];
}
