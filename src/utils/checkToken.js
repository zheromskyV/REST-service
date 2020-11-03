const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../common/config');
const { UnauthorizedError } = require('./errors');

module.exports = (req, res, next) => {
  const tokenString = req.headers.authorization;
  if (tokenString === undefined) {
    throw new UnauthorizedError();
  }

  const [type, token] = tokenString.split(' ');
  if (type !== 'Bearer') {
    throw new UnauthorizedError();
  }

  const isVerified = jwt.verify(token, SECRET_KEY);
  if (!isVerified) {
    throw new UnauthorizedError();
  }

  next();
};
