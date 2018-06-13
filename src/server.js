import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Hapi from 'hapi';
import Inert from 'inert';
import { renderToString } from 'react-dom/server';

import logger from './logger';
import layout from './layout';
import App from './client/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default async function (port) {
  const server = new Hapi.Server({ port });
  try {
    await server.register(Inert);
    await server.route({
      method: 'GET',
      path: `${process.env.RAZZLE_PUBLIC_DIR}/{file*}`,
      handler: {
        directory: {
          path: process.env.RAZZLE_PUBLIC_DIR,
        },
      },
    });

    await server.route({
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

    await server.start();
    logger.info(`🤠   Babeli is up and running on port ${port}`);
  } catch (error) {
    logger.error(error);
  }
}
