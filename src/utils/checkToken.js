const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../common/config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user!');
    } else {
      try {
        jwt.verify(token, SECRET_KEY);
        return next();
      } catch (err) {
        return next(err);
      }
    }
  }

  res.status(401).send('Unauthorized user!');
};
