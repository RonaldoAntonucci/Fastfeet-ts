import 'reflect-metadata';

import { ServiceError } from '../imports';
import FakeUserAttrs from '../models/fakes/FakeUserAttrs';
import UserModel from '../models/UserModel';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User - unit', () => {
  let service: CreateUserService;
  let repo: IUsersRepository;
  let hashProvider: IHashProvider;

  let createUser: jest.SpyInstance;

  let emailInUse: jest.SpyInstance;
  let cpfInUse: jest.SpyInstance;
  let hashPassword: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new CreateUserService(repo, hashProvider);

    createUser = jest.spyOn(repo, 'create');

    emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementation(async () => undefined);

    cpfInUse = jest
      .spyOn(repo, 'findByCpf')
      .mockImplementation(async () => undefined);

    hashPassword = jest.spyOn(hashProvider, 'generateHash');
  });

  it('should be able to creata a new User', async () => {
    const userAttrs = FakeUserAttrs();

    const user = await service.run(userAttrs);

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(cpfInUse).toBeCalledWith(userAttrs.cpf);
    expect(hashPassword).toBeCalledWith(userAttrs.password);
    expect(createUser).toBeCalledWith(userAttrs);
    expect(user).toBeInstanceOf(UserModel);
  });

  it('should be not able to create a new User if EMAIL already in use.', async () => {
    const userAttrs = FakeUserAttrs();

    emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementationOnce(async () => new UserModel());

    await expect(service.run(userAttrs)).rejects.toEqual(
      new ServiceError('This email is already in use.'),
    );

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(cpfInUse).toBeCalledWith(userAttrs.cpf);
    expect(hashPassword).not.toBeCalled();
    expect(createUser).not.toBeCalled();
  });

  it('should be not able to create a new User if CPF already in use.', async () => {
    const userAttrs = FakeUserAttrs();

    cpfInUse = jest
      .spyOn(repo, 'findByCpf')
      .mockImplementationOnce(async () => new UserModel());

    await expect(service.run(userAttrs)).rejects.toEqual(
      new ServiceError('This cpf is already in use.'),
    );

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(cpfInUse).toBeCalledWith(userAttrs.cpf);
    expect(hashPassword).not.toBeCalled();
    expect(createUser).not.toBeCalled();
  });
});
