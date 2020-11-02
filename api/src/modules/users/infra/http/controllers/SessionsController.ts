import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICreateSessionRequest from '@modules/users/apiRequests/ICreateSessionRequest';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

type ICreateRequest = Request<unknown, ICreateSessionRequest>;

export default class SessionsController {
  public async create(
    request: ICreateRequest,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.run({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
