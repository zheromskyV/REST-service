const User = require('./user.model');
const NotFoundError = require('../../utils/errors');
const { hashPassword } = require('../../utils/hashHelper');

const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const getById = async id => User.findOne({ _id: id });

const getByLogin = async login => User.findOne({ login });

const create = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  return User.create(newUser);
};

const update = async (id, user) => User.findOneAndUpdate({ _id: id }, user);

const remove = async id => {
  const res = User.remove({ _id: id });
  if (!res) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove, getByLogin };
