import { inject, injectable } from 'tsyringe';

import { ServiceError } from '../imports';
import UserModel from '../models/UserModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IJwtProvider from '../providers/JwtProvider/models/IJwtProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: UserModel;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JwtProvider')
    private jwtProvider: IJwtProvider,
  ) {}

  public async run({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new ServiceError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new ServiceError('Incorrect email/password combination.', 401);
    }

    const token = this.jwtProvider.sign({
      subject: user.id,
      payload: { role: user.role },
    });

    return {
      token,
      user,
    };
  }
}
