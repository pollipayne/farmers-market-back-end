import { getConnection } from 'typeorm';
import { User } from '../entities/User';


import { UserRepository } from '../repository/userRepository';
import { MarketRepository } from '../repository/MarketRepository';

export class UserService {
  private userRepository: UserRepository;
  private marketRepository: MarketRepository

  constructor() {
    this.userRepository = getConnection('user').getCustomRepository(UserRepository)
    this.marketRepository = getConnection('user').getCustomRepository(MarketRepository)
  }

  public index = async () => {
    const users = await this.userRepository.find({
      relations: ['markets']
    }
    )
    return users;
  }

  public singleIndex = async (id: number) => {
    const user = await this.userRepository.findOne(id, { relations: ['markets'] })
    return user;
  }


  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public addMarketToUser = async (userID: number, marketId: number) => {
    let user = await this.userRepository.findOne(userID, { relations: ['markets'] })
    let market = await this.marketRepository.findOne(marketId, { relations: ['users', 'vendors'] });
    if (!market) {
      throw new Error("market with that ID not found")
    }
    if (!user) {
      throw new Error("User with that ID not found ")
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

