import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Criminal } from '../criminal/criminal.entity';
import { Image } from '../report_images/report_images.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  accident_type: string;

  @Column()
  text: string;

  @OneToMany(type => Image, image => image.report)
  images: Image[];

  @OneToMany(() => Criminal, criminal => criminal.report, { cascade: true })
  criminals: Criminal[];
}