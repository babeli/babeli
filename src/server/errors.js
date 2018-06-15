export class AuthenticationFailed extends Error {
  constructor() {
    super('authentication failed, wrong email or password');
    this.constructor = AuthenticationFailed;
    this.name = 'AuthenticationFailed';
  }
}
