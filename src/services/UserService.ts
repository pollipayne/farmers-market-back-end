import { getConnection } from 'typeorm';
import { User } from '../entities/User';


import { UserRepository } from '../repository/userRepository';
import { MarketRepository } from '../repository/MarketRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection('user').getCustomRepository(UserRepository)
  }

  public index = async () => {
    const users = await this.userRepository.find({
      relations: ['markets']
    }
    )
    return users;
  }


  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public addMarketToUser = async (user: User, marketId: number) => {
    let marketRepository = new MarketRepository();
    let market = await marketRepository.findOne(marketId);
    if (!market) {
      throw new Error("market with that ID not found")
    }
    user.markets?.push(market)
    await this.userRepository.manager.save(user);
  }


  public update = async (user: User, id: number) => {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  public delete = async (id: number) => {
    const deletedUser = await this.userRepository.delete(id);
    return id;
  }
};

