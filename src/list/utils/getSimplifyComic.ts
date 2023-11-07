import { CreateComicDto } from '../dto/create-comic.dto';

export default function (comic: CreateComicDto) {
  return {
    id: comic.id,
    title: comic.title,
    cover: comic.cover,
    date: comic.date,
    tags: comic.tags,
    authors: comic.authors,
    description: comic.description,
  };
}
