export default interface ICreateUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  passwordConfirmation: string;
}
