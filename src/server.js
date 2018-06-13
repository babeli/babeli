import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Hapi from 'hapi';
import Inert from 'inert';
import { renderToString } from 'react-dom/server';

import logger from './logger';
import layout from './layout';
import App from './client/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

class Server {
  async start(port) {
    this.hapiServer = new Hapi.Server({ port });
    try {
      await this.hapiServer.register(Inert);
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

      await this.hapiServer.start();
      logger.info(`🤠  Babeli is up and running on port ${port}`);
    } catch (error) {
      logger.error(error);
    }
  }

  async stop() {
    return this.hapiServer.stop();
  }
}

export default Server;
