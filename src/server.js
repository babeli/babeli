import Path from 'path';
import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Hapi from 'hapi';
import Inert from 'inert';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = new Hapi.Server({
  port: 4000
});

(async () => {
  try {
    await server.register(Inert);
    await server.route({
      method: 'GET',
      path: process.env.RAZZLE_PUBLIC_DIR + '/{file*}',
      handler: {
        directory: {
          path: process.env.RAZZLE_PUBLIC_DIR
        }
      }
    });

    await server.route({
      method: 'GET',
      path: '/{path*}',
      options: {
        async handler(request, h) {
          try {
            const context = {};
            const markup = renderToString(
              <StaticRouter context={context} location={request.url}>
                <App />
              </StaticRouter>
            );

            if (context.url) {
              return h.redirect(context.url);
            }
            else {
              const template = `
                <!doctype html>
                <html lang="">
                <head>
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta charset="utf-8" />
                  <title>Welcome to Razzle</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  ${assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ''}
                  ${process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`}
                </head>
                <body>
                  <div id="root">${markup}</div>
                </body>
                </html>`

              return h.response(template).code(200);
            }
          }
          catch (err) {
            console.log(err);
          }
        }
      }
    });

    await server.start();
  }
  catch (err) {
    console.log(err);
  }
}) ();