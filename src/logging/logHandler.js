const logger = require('./logger');

const logHandler = (req, res, next) => {
  const { params, body, url, method } = req;
  const { statusCode } = res;

  const log = `Request ${method} ${url} resulted with code ${statusCode}.`;
  const bodyLog = `Request body: ${JSON.stringify(body)}.`;
  const paramsLog = `Query params: ${JSON.stringify(params)}.`;

  logger.info({
    message: `${log} ${bodyLog} ${paramsLog}`
  });

  next();
};

module.exports = logHandler;
