import { inject, injectable } from 'tsyringe';
import { ServiceError } from '../imports';

import IUser from '../models/UserModel';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({
    name,
    email,
    cpf,
    password,
  }: IRequestDTO): Promise<IUser> {
    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new ServiceError('This email is already in use.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password,
    });

    return user;
  }
}
