const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
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

  const isVerified = jwt.verify(token, JWT_SECRET_KEY);
  if (!isVerified) {
    throw new UnauthorizedError();
  }

  next();
};
