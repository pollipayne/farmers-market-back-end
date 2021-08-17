import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Vendor } from './Vendor'


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  productName?: string;
  @Column()
  productSeason?: string;
  @ManyToMany(type => Vendor, vendor => vendor.products)
  vendors?: Vendor[];
}