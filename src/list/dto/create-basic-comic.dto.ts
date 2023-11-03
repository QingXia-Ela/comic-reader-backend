export class CreateBasicComicDto {
  id: number;
  title: string;
  cover: string;
  date: string;
  tags: string[];
  description: string;
  constructor(
    id: number,
    title?: string,
    cover?: string,
    date?: string,
    tags?: string[],
    description?: string,
  ) {
    this.id = id;
    this.title = title ?? '';
    this.cover = cover ?? '';
    this.date = date ?? new Date().toISOString();
    this.tags = tags ?? [];
    this.description = description ?? '';
  }
}
