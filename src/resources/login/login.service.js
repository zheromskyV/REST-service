const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRE_TIME } = require('../../common/config');
const { checkHashedPassword } = require('../../utils/hashHelper');
const usersRepo = require('../users/user.db.repository');

const signToken = async (login, password) => {
  const user = usersRepo.getByLogin(login);
  if (!user) {
    return null;
  }

  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);
  if (!comparisonRes) {
    return null;
  }

  const { id, login: l } = user;
  const token = jwt.sign({ id, l }, SECRET_KEY, {
    expiresIn: EXPIRE_TIME
  });

  return token;
};

module.exports = {
  signToken
};
