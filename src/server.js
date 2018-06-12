import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Hapi from 'hapi';
import Inert from 'inert';
import { renderToString } from 'react-dom/server';

import layout from './layout';
import App from './client/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = new Hapi.Server({
  port: 4000,
});

export default async function () {
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
        async handler(request, h) {
          try {
            const context = {};
            const markup = renderToString(<StaticRouter context={context} location={request.url}><App /></StaticRouter>);
            if (context.url) {
              return h.redirect(context.url);
            }
            return h.response(layout(assets, markup)).code(200);
          } catch (err) {
            console.log(err);
            return null;
          }
        },
      },
    });

    await server.start();
  } catch (err) {
    console.log(err);
  }
}
