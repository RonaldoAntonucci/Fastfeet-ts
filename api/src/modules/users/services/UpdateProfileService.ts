import { inject, injectable } from 'tsyringe';

import { ServiceError } from '../imports';

import UserModel from '../models/UserModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  userId: string;
  name: string;
  email?: string;
  cpf?: string;
  oldPassword?: string;
  password?: string;
  role?: 'admin' | 'user' | 'deliveryman';
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({
    userId,
    password,
    oldPassword,
    name,
    email,
    cpf,
    role,
  }: IRequestDTO): Promise<UserModel> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ServiceError('User not found.');
    }

    if (email) {
      const checkEmail = await this.usersRepository.findByEmail(email);
      if (checkEmail) {
        throw new ServiceError('E-mail already in use.');
      }

      user.email = email;
    }

    if (cpf) {
      const checkCpf = await this.usersRepository.findByCpf(cpf);
      if (checkCpf) {
        throw new ServiceError('CPF already in use.');
      }

      user.cpf = cpf;
    }

    if (password) {
      if (!oldPassword) {
        throw new ServiceError(
          'You need to inform the old password to set a new password.',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new ServiceError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (role) {
      user.role = role;
    }

    user.name = name;

    return this.usersRepository.save(user);
  }
}
