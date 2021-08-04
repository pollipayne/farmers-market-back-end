import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Vendor } from './Vendor';

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  marketName?: string;
  @Column()
  marketLocation?: string;
  @Column()
  marketSeason?: string;

  @ManyToMany(type => User, user => user.markets)
  users?: User[];

  @ManyToMany(type => Vendor, vendor => vendor.markets, {
    cascade: true
  })
  @JoinTable()
  vendors?: Vendor[]
}



