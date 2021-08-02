import { getConnection } from 'typeorm';
import { User } from '../entities/User';


import { UserRepository } from '../repository/userRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection('user').getCustomRepository(UserRepository)
  }

  public index = async () => {
    const users = await this.userRepository.find()
    return users;
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
    const deletedUser = await this.userRepository.delete(id);
    return id;
  }
};

