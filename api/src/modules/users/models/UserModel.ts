export default class UserModel {
  id?: string;

  name: string;

  email: string;

  cpf: string;

  password: string;

  role: 'user' | 'admin' | 'deliveryman';
}
