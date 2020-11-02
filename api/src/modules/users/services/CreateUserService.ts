import { inject, injectable } from 'tsyringe';

import { ServiceError } from '../imports';

import IUser from '../models/UserModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({
    name,
    email,
    cpf,
    password,
  }: IRequestDTO): Promise<IUser> {
    const emailInUse = this.usersRepository.findByEmail(email);
    const cpfInUse = this.usersRepository.findByCpf(cpf);

    if (await emailInUse) {
      throw new ServiceError('This email is already in use.');
    }

    if (await cpfInUse) {
      throw new ServiceError('This cpf is already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    });

    return user;
  }
}
