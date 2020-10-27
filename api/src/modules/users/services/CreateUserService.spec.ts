import 'reflect-metadata';
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

    const user = await service.run(userAttrs);

    expect(createUser).toBeCalled();
    expect(user).toBeInstanceOf(UserModel);
  });
});
