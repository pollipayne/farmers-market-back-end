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

  public singleAuth = async (email: string) => {
    const user = await this.userRepository.findOne(email, { relations: ['markets'] })
    return user;
  }


  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }


  public update = async (user: User, id: number) => {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  public delete = async (id: number) => {
    const deletedUser = await this.userRepository.findOne(id)
    if (deletedUser) {
      const activeDelete = await this.userRepository.remove(deletedUser)
    }
    return id;
  }
};

