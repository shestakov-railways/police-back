import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", name: "email", unique: true })
  email: string;

  @Column({ type: "varchar", name: "phone", unique: true })
  phone: string;

  @Column({ type: "varchar", name: "password" })
  password: string;
}