import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

import IJwtProvider from './JwtProvider/models/IJwtProvider';
import JsonWebTokenProvider from './JwtProvider/implementations/JsonWebTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IJwtProvider>('JwtProvider', JsonWebTokenProvider);
