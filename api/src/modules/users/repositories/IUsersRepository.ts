import IUser from '../models/IUser';
import ICreateUsersDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<IUser>;
}
