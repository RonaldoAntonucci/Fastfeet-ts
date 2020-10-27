import UserModel from '../models/UserModel';
import ICreateUsersDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<UserModel>;
}