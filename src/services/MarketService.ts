import { getConnection, getRepository } from 'typeorm';
import { Market } from '../entities/Market';
import { UserRepository } from '../repository/userRepository';
import { MarketRepository } from '../repository/MarketRepository';



export class MarketService {
  private marketRepository: MarketRepository;
  private userRepository: UserRepository


  constructor() {
    this.marketRepository = getConnection('user').getCustomRepository(MarketRepository)
    this.userRepository = getConnection('user').getCustomRepository(UserRepository)
  }


  public index = async () => {
    const markets = await this.marketRepository.find({
      relations: ['users', 'vendors']
    })
    return markets;
  }


  public singleIndex = async (id: number) => {
    const market = await this.marketRepository.findOne(id, { relations: ['users', 'vendors'] })
    return market;
  }


  public create = async (markets: Market, userID: number) => {
    const newMarket = markets
    const associatedUser = await this.userRepository.findOne(userID)
    if (associatedUser && newMarket.users) {
      newMarket.users.push(associatedUser)
    } else if (associatedUser) {
      newMarket.users = []
      newMarket.users.push(associatedUser)
    } else {
      throw new Error("Couldn't find associated user")
    }
    await this.marketRepository.save(markets);
    return newMarket;
  }


  public update = async (market: Market, id: number) => {
    const updatedMarket = await this.marketRepository.update(id, market);
    return `market ${market.marketName} has been updated.`;
  }


  public delete = async (id: number) => {
    const deletedMarket = await this.marketRepository.findOne(id)
    if (deletedMarket) {
      const activeDelete = await this.marketRepository.remove(deletedMarket)
    }
    return `market with ${id} ID has been deleted.`;
  }


};
