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

  public async save(user: UserModel): Promise<UserModel> {
    return user;
  }

  public async findById(id: string): Promise<UserModel> {
    const user = new UserModel();

    user.id = id;

    return user;
  }

  public async findByEmail(email: string): Promise<UserModel> {
    const user = new UserModel();

    user.email = email;

    return user;
  }

  public async findByCpf(cpf: string): Promise<UserModel> {
    const user = new UserModel();

    user.cpf = cpf;

    return user;
  }
}
