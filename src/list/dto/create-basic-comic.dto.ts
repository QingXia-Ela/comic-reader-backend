export class CreateBasicComicDto {
  id: number;
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
  }: Partial<CreateBasicComicDto>) {
    this.id = id;
    this.title = title ?? '';
    this.cover = cover ?? '';
    this.date = date ?? new Date().toISOString();
    this.tags = tags ?? [];
    this.description = description ?? '';
  }
}
