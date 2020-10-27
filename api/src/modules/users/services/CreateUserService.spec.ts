import 'reflect-metadata';

import { ServiceError } from '../imports';
import FakeUserAttrs from '../models/fakes/FakeUserAttrs';
import UserModel from '../models/UserModel';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User - unit', () => {
  let service: CreateUserService;
  let repo: IUsersRepository;

  let createUser: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    service = new CreateUserService(repo);

    createUser = jest.spyOn(repo, 'create');
  });

  it('should be able to creata a new User', async () => {
    const userAttrs = FakeUserAttrs();

    const emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementationOnce(async () => undefined);

    const user = await service.run(userAttrs);

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(createUser).toBeCalledWith(userAttrs);
    expect(user).toBeInstanceOf(UserModel);
  });

  it('should be not able to create a new User if email already in use.', async () => {
    const userAttrs = FakeUserAttrs();

    const emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementationOnce(async () => new UserModel());

    await expect(service.run(userAttrs)).rejects.toEqual(
      new ServiceError('This email is already in use.'),
    );

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(createUser).not.toBeCalled();
  });
});
