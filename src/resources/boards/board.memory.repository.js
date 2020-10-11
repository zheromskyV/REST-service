const DB = require('../../common/inMemory');
const NotFoundError = require('../../utils/errors');

const TABLE_NAME = 'boards';
const ENTITY_NAME = 'board';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async id => {
  const board = await DB.getEntityById(TABLE_NAME, id);
  if (!board) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return board;
};

const create = async board => DB.createEntity(TABLE_NAME, board);

const update = async (id, board) => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, id, board);
  if (!updatedBoard) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return updatedBoard;
};

const remove = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove };
