import 'reflect-metadata';
import { ServiceError } from '../imports';

import FakeUserAttrs from '../models/fakes/FakeUserAttrs';
import UserModel from '../models/UserModel';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeJwtProvider from '../providers/JwtProvider/fakes/FakeJwtProvider';
import IJwtProvider from '../providers/JwtProvider/models/IJwtProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

describe('Authenticate User', () => {
  let service: AuthenticateUserService;
  let usersRepo: IUsersRepository;
  let hashProvider: IHashProvider;
  let jwtProvider: IJwtProvider;

  let checkUser: jest.SpyInstance;
  let checkPassword: jest.SpyInstance;
  let checkGenerateJwt: jest.SpyInstance;

  beforeEach(() => {
    usersRepo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    jwtProvider = new FakeJwtProvider();
    service = new AuthenticateUserService(usersRepo, hashProvider, jwtProvider);

    checkUser = jest.spyOn(usersRepo, 'findByEmail');
    checkPassword = jest.spyOn(hashProvider, 'compareHash');
    checkGenerateJwt = jest.spyOn(jwtProvider, 'sign');
  });

  it('should be able to Authenticate.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.role = 'admin';
      user.password = 'hashedPassword';

      return user;
    });
    checkPassword.mockImplementationOnce(async () => true);

    const auth = await service.run({
      email: userAttrs.email,
      password: userAttrs.password,
    });

    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('user');
    expect(checkPassword).toHaveBeenCalledWith(
      userAttrs.password,
      'hashedPassword',
    );
    expect(checkGenerateJwt).toHaveBeenCalledWith({
      subject: userAttrs.id,
      payload: { role: 'admin' },
    });
  });

  it('should not be able to Authenticate with wrong email.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => undefined);

    await expect(
      service.run({
        email: userAttrs.email,
        password: userAttrs.password,
      }),
    ).rejects.toEqual(
      new ServiceError('Incorrect email/password combination.', 401),
    );

    expect(checkPassword).not.toHaveBeenCalled();
    expect(checkGenerateJwt).not.toHaveBeenCalled();
  });

  it('should not be able to Authenticate with wrong password.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.role = 'admin';
      user.password = 'hashedPassword';

      return user;
    });
    checkPassword.mockImplementationOnce(async () => false);

    await expect(
      service.run({
        email: userAttrs.email,
        password: userAttrs.password,
      }),
    ).rejects.toEqual(
      new ServiceError('Incorrect email/password combination.', 401),
    );

    expect(checkPassword).toHaveBeenCalledWith(
      userAttrs.password,
      'hashedPassword',
    );
    expect(checkGenerateJwt).not.toHaveBeenCalled();
  });
});
