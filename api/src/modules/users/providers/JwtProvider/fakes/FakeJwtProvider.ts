import IJwtProvider from '../models/IJwtProvider';

export default class FakeJwtProvider implements IJwtProvider {
  public sign(): string {
    return Math.random().toString();
  }
}
