const logger = require('./logger');
const getLog = require('../utils/getLog');

const logHandler = (req, res, next) => {
  logger.info({
    message: getLog({ ...req })
  });

  next();
};

module.exports = logHandler;
