import { getConnection, getRepository } from 'typeorm';
import { Market } from '../entities/Market';


import { MarketRepository } from '../repository/MarketRepository';

export class MarketService {
  private marketRepository: MarketRepository;

  constructor() {
    this.marketRepository = getConnection('user').getCustomRepository(MarketRepository)

  }

  public index = async () => {
    const markets = await this.marketRepository.find({
      relations: ['users', 'vendors']
    })
    return markets;
  }

  public create = async (market: Market) => {
    const newMarket = await this.marketRepository.save(market);
    return newMarket;
  }
  public update = async (market: Market, id: number) => {
    const updatedMarket = await this.marketRepository.update(id, market);
    return `market ${market.marketName} has been updated.`;
  }

  public delete = async (id: number) => {
    const deletedMarket = await this.marketRepository.delete(id);
    return `market with ${id} ID has been deleted.`;
  }
};
