export class CreateBasicComicDto {
  id: number;
  authors: string[];
  title: string;
  cover: string;
  date: string;
  tags: string[];
  description: string;
  constructor({
    id,
    title,
    cover,
    date,
    tags,
    description,
    authors,
  }: Partial<CreateBasicComicDto>) {
    this.id = id;
    this.title = title ?? '';
    this.authors = authors ?? [];
    this.cover = cover ?? '';
    this.date = date ?? new Date().toISOString();
    this.tags = tags ?? [];
    this.description = description ?? '';
  }
}
