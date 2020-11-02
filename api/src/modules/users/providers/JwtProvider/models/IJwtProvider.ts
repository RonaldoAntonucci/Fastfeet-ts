export interface ISignDTO {
  payload?: string | Record<string, unknown> | Buffer;
  subject: string;
}

export default interface IJwtProvider {
  sign(data: ISignDTO): string;
}
