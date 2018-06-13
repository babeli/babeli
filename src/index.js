import Server from './server';
import logger from './logger';

let server = new Server();
server.start(process.env.PORT || 3000).then(() => {
  if (module.hot) {
    logger.info('✅  Server-side HMR Enabled!');
    module.hot.accept('./server', () => {
      logger.info('🔁  HMR Reloading `./server`...');
      server.stop().then(() => {
        const NewServer = require('./server').default;
        server = new NewServer();
        server.start(process.env.PORT || 3000);
      }).catch((error) => {
        logger.error(error);
      });
    });
  }
}).catch((error) => {
  logger.error(error);
});
