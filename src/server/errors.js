export class AuthenticationFailed extends Error {
  constructor() {
    super('authentication failed, wrong email or password');
    this.name = 'AuthenticationFailed';
  }
}
