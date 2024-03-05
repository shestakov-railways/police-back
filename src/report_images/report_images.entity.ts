import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Report } from '../report/report.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('mediumtext')
  data: string; 

  @ManyToOne(() => Report, report => report.images)
  report: Report;
}