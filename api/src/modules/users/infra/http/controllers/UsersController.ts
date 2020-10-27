import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

import IUser from '../../../models/IUser';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<IUser>> {
    const { name, email, cpf, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({ name, email, cpf, password });

    return response.json(user);
  }
}
