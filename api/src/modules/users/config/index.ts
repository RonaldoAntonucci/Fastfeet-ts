export default interface IConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
