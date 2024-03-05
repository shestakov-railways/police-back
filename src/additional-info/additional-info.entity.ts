import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Criminal } from '../criminal/criminal.entity';

@Entity()
export class AdditionalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => Criminal, criminal => criminal.additional)
  criminal: Criminal;
}