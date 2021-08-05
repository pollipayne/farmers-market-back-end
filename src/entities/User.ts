import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Market } from './Market'


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  email?: string;
  @Column()
  userName?: string;
  @Column()
  isLoggedIn!: boolean;
  @Column()
  password?: string

  @ManyToMany(type => Market, market => market.users, {
    cascade: true
  })
  @JoinTable()
  markets?: Market[];
}