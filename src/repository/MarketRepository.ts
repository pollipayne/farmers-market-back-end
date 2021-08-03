import { EntityRepository, Repository } from 'typeorm';
import { Market } from '../entities/Market';

@EntityRepository(Market)
export class MarketRepository extends Repository<Market> {


  async findOneMarket(marketId: number): Promise<Market> {
    let market = await this.findOne({
      where: { id: marketId }
    });
    if (!market) {
      throw new Error(`Could not find that market ID`)
    }
    return market;
  }

}
