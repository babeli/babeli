import client from '../../../../test/client';
import modelFactory from '../../../models/__factories__';

describe('/api/v1/session', () => {
  describe('POST', () => {
    it('should create new session', async () => {
      const user = await modelFactory.create('User');
      const response = await client.post('/api/v1/session', {
        email: user.email,
        password: user.password,
      });
      expect(response.statusCode).toEqual(200);
      expect(response.headers['set-cookie'][0].indexOf('sid-babeli')).toEqual(0);
      expect(response.result).toEqual({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });

    it('should validate input', async () => {
      const response = await client.post('/api/v1/session', {
        crack: 'The hacker',
      });
      expect(response.result).toEqual({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid request payload input',
      });
    });

    it('should return 401 for wrong email or password', async () => {
      const response = await client.post('/api/v1/session', {
        email: 'test@example.org',
        password: 'secret',
      });
      expect(response.result).toEqual({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'wrong email or password',
      });
    });
  });

  describe('GET', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await client.get('/api/v1/session');
      expect(response.statusCode).toEqual(401);
    });

    it('should return current user session if user is authenticated', async () => {
      const user = await modelFactory.create('User');
      const authenticatedClient = await client.login(user.email, user.password);
      const response = await authenticatedClient.get('/api/v1/session');

      expect(response.statusCode).toEqual(200);
      expect(response.result).toEqual({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  });

  describe('DELETE', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await client.delete('/api/v1/session');
      expect(response.statusCode).toEqual(401);
    });

    it('should delete session if user is authenticated', async () => {
      const user = await modelFactory.create('User');
      const authenticatedClient = await client.login(user.email, user.password);
      const response = await authenticatedClient.delete('/api/v1/session');
      expect(response.statusCode).toEqual(204);
      const response2 = await authenticatedClient.get('/api/v1/session');
      expect(response2.statusCode).toEqual(401);
    });
  });
});
