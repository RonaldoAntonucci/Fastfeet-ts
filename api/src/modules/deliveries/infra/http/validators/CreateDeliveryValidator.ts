import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate({
    [Segments.BODY]: {
      deliverymanId: Joi.string().uuid({ version: 'uuidv4' }).required(),
      product: Joi.string().required(),
      adress: Joi.string().required(),
      postalCode: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  });
