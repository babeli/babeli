import { createLogger, format, transports } from 'winston';

const level = process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console({ level })],
});

export default logger;
