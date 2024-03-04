import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: "news" })
export class News {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", name: "title" })
  title: string;

  @Column({ type: "text", name: "content" })
  content: string;

  @Column({ type: "varchar", name: "image" })
  image: string;
}