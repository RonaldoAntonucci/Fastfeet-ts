export default interface IUpdateProfileRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  oldPassword: string;
}
