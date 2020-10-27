export default interface IUser {
  id?: string;

  name: string;

  email: string;

  cpf: string;

  password: string;

  role: 'user' | 'admin' | 'deliveryman';
}
