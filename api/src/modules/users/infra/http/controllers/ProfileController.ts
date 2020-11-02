import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IUpdateProfileRequest from '@modules/users/apiRequests/IUpdateProfileRequestDTO';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

type IUpdateRequest = Request<unknown, IUpdateProfileRequest>;

export default class ProfileController {
  public async update(
    request: IUpdateRequest,
    response: Response,
  ): Promise<Response> {
    const userId = request.user.id;

    const { name, email, password, oldPassword, cpf } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.run({
      userId,
      name,
      email,
      password,
      cpf,
      oldPassword,
    });

    return response.json(classToClass(user));
  }
}
