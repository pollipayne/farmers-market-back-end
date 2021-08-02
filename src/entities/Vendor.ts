import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Market } from './Market'


@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  vendorName?: string;
  @Column()
  vendorLocation?: string;
  @Column()
  vendorSeason?: string;

  @ManyToMany(type => Market, market => market.vendors)
  markets?: Market[];
}