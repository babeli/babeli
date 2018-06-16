import Server from '../server';

process.env.RAZZLE_ASSETS_MANIFEST = [];
process.env.RAZZLE_PUBLIC_DIR = `${process.cwd()}/public`;

class TestClient {
  constructor(serverPromise, cookie) {
    this.serverPromise = serverPromise;
    this.cookie = cookie;
  }

  server() {
    if (!this.serverPromise) {
      this.serverPromise = new Promise((resolve) => {
        const server = new Server();
        server.setup(3000).then(() => server.initialize().then(() => resolve(server))).catch(e => console.error(e));
      });
    }
    return this.serverPromise;
  }

  async get(url) {
    const server = await this.server();
    return server.inject({ method: 'GET', url, headers: this.headers() });
  }

  async post(url, payload) {
    const server = await this.server();
    return server.inject({
      method: 'POST',
      url,
      payload,
      headers: this.headers(),
    });
  }

  async delete(url) {
    const server = await this.server();
    return server.inject({ method: 'DELETE', url, headers: this.headers() });
  }

  async login(email, password) {
    const response = await this.post('/api/v1/session', { email, password });
    const cookie = `${response.headers['set-cookie'][0].split(';')[0]};`;
    return new TestClient(this.serverPromise, cookie);
  }

  headers() {
    if (this.cookie) {
      return { cookie: this.cookie };
    }
    return {};
  }
}

export default new TestClient();
