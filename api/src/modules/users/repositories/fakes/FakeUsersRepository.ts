import iCreateUserDTO from '../../dtos/ICreateUserDTO';
import UserModel from '../../models/UserModel';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  public async create(data: iCreateUserDTO): Promise<UserModel> {
    const user = new UserModel();

    Object.assign(user, data);

    user.id = Math.random().toString();

    return user;
  }
}
