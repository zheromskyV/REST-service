const logger = require('./logger');
const getLog = require('../utils/getLog');
const {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError
} = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _) => {
  const { message } = err;

  if (err instanceof NotFoundError) {
    res.status(404).send(message);
  } else if (err instanceof UnauthorizedError) {
    res.status(401).send(message);
  } else if (err instanceof ForbiddenError) {
    res.status(403).send(message);
  } else {
    res.status(500).send('Internal server error');
  }

  logger.error(getLog({ ...req, ...res, message }, true));
};

module.exports = errorHandler;
