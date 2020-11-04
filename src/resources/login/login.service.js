const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkHashedPassword } = require('../../utils/hashHelper');
const usersRepo = require('../users/user.db.repository');

const signToken = async (login, password) => {
  const user = await usersRepo.getByLogin(login);
  if (!user) {
    return null;
  }

  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);
  if (!comparisonRes) {
    return null;
  }

  const token = jwt.sign({ id: user._id, login }, JWT_SECRET_KEY);

  return token;
};

module.exports = {
  signToken
};
