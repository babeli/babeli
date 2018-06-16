import React from 'react';
import hat from 'hat';
import { StaticRouter } from 'react-router-dom';
import Hapi from 'hapi';
import Inert from 'inert';
import AuthCookie from 'hapi-auth-cookie';
import { renderToString } from 'react-dom/server';

import logger from './logger';
import layout from './layout';
import apiRoutes from './server/api';
import App from './client/App';

class Server {
  async start(port) {
    try {
      await this.setup(port);
      await this.hapiServer.start();
      logger.info(`🤠  Babeli is up and running on port ${port}`);
    } catch (error) {
      logger.error(error);
    }
  }

  async setup(port) {
    const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

    this.hapiServer = new Hapi.Server({ port });

    try {
      await this.hapiServer.register(Inert);
      await this.hapiServer.register(AuthCookie);

      const cache = this.hapiServer.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
      this.hapiServer.app.cache = cache;

      this.hapiServer.auth.strategy('session', 'cookie', {
        password: process.env.BABELI_SECURE || hat(),
        cookie: 'sid-babeli',
        isSecure: false,
        validateFunc: async (request, session) => {
          const cached = await cache.get(session.sid);
          const out = {
            valid: !!cached,
          };

          if (out.valid) {
            out.credentials = cached.account;
          }
          return out;
        },
      });

      this.hapiServer.auth.default('session');

      await this.hapiServer.route({
        method: 'GET',
        path: `${process.env.RAZZLE_PUBLIC_DIR}/{file*}`,
        handler: {
          directory: {
            path: process.env.RAZZLE_PUBLIC_DIR,
          },
        },
      });

      await this.hapiServer.route({
        method: 'GET',
        path: '/{path*}',
        options: {
          auth: false,
          async handler(request, handler) {
            try {
              const context = {};
              const markup = renderToString(<StaticRouter context={context} location={request.url}><App /></StaticRouter>);
              if (context.url) {
                return handler.redirect(context.url);
              }
              return handler.response(layout(assets, markup)).code(200);
            } catch (error) {
              logger.error(error);
              return null;
            }
          },
        },
      });

      apiRoutes.forEach(route => this.hapiServer.route(route));
    } catch (error) {
      logger.error(error);
    }
  }

  async inject(request) {
    return this.hapiServer.inject(request);
  }

  async initialize() {
    return this.hapiServer.initialize();
  }

  async stop() {
    return this.hapiServer.stop();
  }
}

export default Server;
