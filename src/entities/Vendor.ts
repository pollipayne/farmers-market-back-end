import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Market } from './Market'
import { Product } from './Product';


@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  vendorName?: string;
  @Column()
  vendorSeason?: string;

  @ManyToMany(type => Market, market => market.vendors)
  markets?: Market[];

  @ManyToMany(type => Product, product => product.vendors, {
    cascade: true
  })
  @JoinTable()
  products?: Product[]
}