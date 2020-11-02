import UserModel from '../models/UserModel';
import ICreateUsersDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<UserModel>;

  save(user: UserModel): Promise<UserModel>;

  findById(id: string): Promise<UserModel | undefined>;

  findByEmail(email: string): Promise<UserModel | undefined>;

  findByCpf(cpf: string): Promise<UserModel | undefined>;
}
