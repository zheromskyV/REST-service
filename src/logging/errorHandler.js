const logger = require('./logger');
const getLog = require('../utils/getLog');

const errorHandler = (err, req, res) => {
  logger.error(getLog({ ...req, ...err }, true));

  res.status(500).json(err.message);
};

module.exports = errorHandler;
