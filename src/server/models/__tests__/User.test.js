import factory from '../__factories__';
import { User } from '../';

describe('User', () => {
  it('should create user from factory', async () => {
    const user = await factory.create('User');
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.encryptedPassword).toBeDefined();
    expect(user.apiKey.length).toEqual(64);
  });

  it('should validate mandatory fields', async () => {
    expect.assertions(2);
    try {
      await User.create({});
    } catch (e) {
      const { errors } = e;
      expect(errors[0].message).toEqual('User.email cannot be null');
      expect(errors[1].message).toEqual('User.encryptedPassword cannot be null');
    }
  });

  it('should validate email uniqueness', async () => {
    const user = await factory.create('User');
    try {
      await User.create({
        email: user.email,
        password: user.password,
      });
    } catch (e) {
      const { errors } = e;
      expect(errors[0].message).toEqual('email must be unique');
    }
  });

  it('should authenticate user', async () => {
    const user = await factory.create('User');
    const authenticatedUser = await User.authenticate(user.email, user.password);
    expect(authenticatedUser.id).toEqual(user.id);
  });

  it('should not authenticate user', async () => {
    const user = await factory.create('User');
    expect.assertions(2);

    try {
      await User.authenticate(user.email, 'wrong password');
    } catch (e) {
      expect(e.name).toEqual('AuthenticationFailed');
    }

    try {
      await User.authenticate('Wrong@email.com', user.password);
    } catch (e) {
      expect(e.name).toEqual('AuthenticationFailed');
    }
  });
});
