import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ICreateUserRequestDTO from '../../../apiRequests/ICreateUserRequestDTO';
import CreateUserService from '../../../services/CreateUserService';

import IUser from '../../../models/UserModel';

type ICreateRequest = Request<unknown, unknown, ICreateUserRequestDTO>;

export default class UsersController {
  public async create(
    request: ICreateRequest,
    response: Response,
  ): Promise<Response<IUser>> {
    const { name, email, cpf, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({ name, email, cpf, password });

    return response.json(user);
  }
}
