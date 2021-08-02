import { EntityRepository, Repository } from 'typeorm';
import { Market } from '../entities/Market';

@EntityRepository(Market)
export class MarketRepository extends Repository<Market> {

}
