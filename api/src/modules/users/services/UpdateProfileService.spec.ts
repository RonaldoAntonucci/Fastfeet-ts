import 'reflect-metadata';
import { ServiceError } from '../imports';

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
    const hashedOldPassword = 'hashedOldPassword';

    checkUser.mockImplementationOnce(() => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.password = hashedOldPassword;
      return user;
    });

    checkEmail.mockImplementationOnce(async () => undefined);
    checkCpf.mockImplementationOnce(async () => undefined);
    checkOldPassword.mockImplementationOnce(() => true);
    checkHashNewPassword.mockImplementationOnce(async pass => pass);

    const updatedUser = await service.run({
      ...userAttrs,
      userId: 'fakeId',
      oldPassword,
    });

    expect(updatedUser).toEqual(userAttrs);

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).toBeCalledWith(userAttrs.cpf);
    expect(checkOldPassword).toBeCalledWith(oldPassword, hashedOldPassword);
    expect(checkHashNewPassword).toBeCalledWith(userAttrs.password);
    expect(checkUserUpdate).toBeCalledWith(userAttrs);
  });

  it('should not be able to update profile if user not exists.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';

    checkUser.mockImplementationOnce(async () => undefined);

    await expect(
      service.run({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new ServiceError('User not found.'));

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).not.toBeCalled();
    expect(checkCpf).not.toBeCalled();
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to change to another user email if new email is already in use.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';

    checkUser.mockImplementationOnce(async () => new UserModel());
    checkEmail.mockImplementationOnce(async () => new UserModel());

    await expect(
      service.run({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new ServiceError('E-mail already in use.'));

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).not.toBeCalled();
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to change to another CPF if new CPF is already in use.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';

    checkUser.mockImplementationOnce(async () => new UserModel());
    checkEmail.mockImplementationOnce(async () => undefined);
    checkCpf.mockImplementationOnce(async () => new UserModel());

    await expect(
      service.run({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new ServiceError('CPF already in use.'));

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).toBeCalledWith(userAttrs.cpf);
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to update the password without old password.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => new UserModel());
    checkEmail.mockImplementationOnce(async () => undefined);
    checkCpf.mockImplementationOnce(async () => undefined);

    await expect(
      service.run({
        ...userAttrs,
        userId: 'fakeId',
      }),
    ).rejects.toEqual(
      new ServiceError(
        'You need to inform the old password to set a new password.',
      ),
    );

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).toBeCalledWith(userAttrs.cpf);
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to update the password with wrong old password.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';
    const hashedOldPassword = 'hashedOldPassword';

    checkUser.mockImplementationOnce(() => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.password = hashedOldPassword;
      return user;
    });
    checkEmail.mockImplementationOnce(async () => undefined);
    checkCpf.mockImplementationOnce(async () => undefined);
    checkOldPassword.mockImplementationOnce(async () => false);

    await expect(
      service.run({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new ServiceError('Old password does not match.'));

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkCpf).toBeCalledWith(userAttrs.cpf);
    expect(checkOldPassword).toBeCalledWith(oldPassword, hashedOldPassword);
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should be able to updated profile without email, password and cpf.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new UserModel();
      Object.assign(user, userAttrs);
      user.name = 'otherName';
      return user;
    });

    const updatedUser = await service.run({
      name: userAttrs.name,
      userId: userAttrs.id,
    });

    expect(updatedUser).toEqual(userAttrs);

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).not.toBeCalled();
    expect(checkCpf).not.toBeCalled();
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).toBeCalledWith(userAttrs);
  });
});
