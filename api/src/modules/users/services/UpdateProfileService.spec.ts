import 'reflect-metadata';

import FakeUserAttrs from '../models/fakes/FakeUserAttrs';
import UserModel from '../models/UserModel';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import UpdateProfileService from './UpdateProfileService';

describe('Update User Profile Service - unit', () => {
  let service: UpdateProfileService;
  let usersRepo: IUsersRepository;
  let hashProvider: IHashProvider;

  let checkUser: jest.SpyInstance;
  let checkEmail: jest.SpyInstance;
  let checkCpf: jest.SpyInstance;
  let checkOldPassword: jest.SpyInstance;
  let checkHashNewPassword: jest.SpyInstance;
  let checkUserUpdate: jest.SpyInstance;

  beforeEach(() => {
    usersRepo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new UpdateProfileService(usersRepo, hashProvider);

    checkUser = jest.spyOn(usersRepo, 'findById');
    checkEmail = jest.spyOn(usersRepo, 'findByEmail');
    checkCpf = jest.spyOn(usersRepo, 'findByCpf');
    checkOldPassword = jest.spyOn(hashProvider, 'compareHash');
    checkHashNewPassword = jest.spyOn(hashProvider, 'generateHash');
    checkUserUpdate = jest.spyOn(usersRepo, 'save');
  });

  it('should be able to update the profile(name, email, cpf, password, role)', async () => {
    /**
     * validar o usuário
     * validar o email
     * validar o cpf
     * validar o old password
     * gerar o hash do novo password
     * atualizar o usuário
     */

    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';
    userAttrs.role = 'admin';

    const oldPassword = '123456';
    const hashedOldPassword = await hashProvider.generateHash(oldPassword);

    checkUser.mockImplementationOnce(() => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.password = hashedOldPassword;
      return user;
    });

    checkEmail.mockImplementationOnce(async () => undefined);
    checkCpf.mockImplementationOnce(async () => undefined);
    checkOldPassword.mockImplementationOnce(() => true);

    const updatedUser = await service.run({
      ...userAttrs,
      userId: 'fakeId',
      oldPassword,
    });

    const expectUpdatedUser = {
      ...userAttrs,
      password: await hashProvider.generateHash(userAttrs.password),
    };

    expect(updatedUser).toEqual(expectUpdatedUser);

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).toBeCalledWith(userAttrs.cpf);
    expect(checkOldPassword).toBeCalledWith(oldPassword, hashedOldPassword);
    expect(checkHashNewPassword).toBeCalledWith(userAttrs.password);
    expect(checkUserUpdate).toBeCalledWith(expectUpdatedUser);
  });
});
