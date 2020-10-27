import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';
import iCreateUserDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    cpf,
    password,
  }: iCreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      cpf,
      role: 'user',
    });

    await this.ormRepository.save(user);

    return user;
  }
}
