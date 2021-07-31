import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}