const logger = require('./logger');
const { exit } = process;

const unhandledRejection = err => {
  logger.log({
    level: 'error',
    message: `Unhandled Rejection: ${err.message}`
  });
};

const uncaughtExceptionHandler = err => {
  logger.log({
    level: 'error',
    message: `Uncaught Exception: ${err.message}`
  });
  logger.on('finish', () => exit(1));
};

module.exports = {
  unhandledRejection,
  uncaughtExceptionHandler
};
