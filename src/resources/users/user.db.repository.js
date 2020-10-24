const User = require('./user.model');
const NotFoundError = require('../../utils/errors');

const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return user;
};

const create = async user => User.create(user);

const update = async (id, user) => {
  const updatedUser = await User.updateOne({ _id: id }, user);
  if (!updatedUser) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return updatedUser;
};

const remove = async id => {
  if ((await User.deleteOne({ _id: id })).ok === 0) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove };
