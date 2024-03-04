import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: "contact" })
export class Contact {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", name: "email" })
  email: string;

  @Column({ type: "text", name: "message" })
  message: string;
}