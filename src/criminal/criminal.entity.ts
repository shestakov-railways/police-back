import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Report } from '../report/report.entity';
import { AdditionalInfo } from '../additional-info/additional-info.entity';

@Entity()
export class Criminal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @ManyToOne(() => Report, report => report.criminals)
  report: Report;

  @OneToMany(() => AdditionalInfo, additional => additional.criminal, { cascade: true })
  additional: AdditionalInfo[];
}