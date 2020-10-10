const DB = require('../../common/inMemory');
const NotFoundError = require('../../utils/errors');

const TABLE_NAME = 'users';
const ENTITY_NAME = 'user';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async id => {
  const user = await DB.getEntityById(TABLE_NAME, id);
  if (!user) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return user;
};

const create = async user => DB.createEntity(TABLE_NAME, user);

const update = async (id, user) => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, id, user);
  if (!updatedUser) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return updatedUser;
};

const remove = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove };
