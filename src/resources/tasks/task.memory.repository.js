const DB = require('../../common/inMemory');
const NotFoundError = require('../../utils/errors');

const TABLE_NAME = 'tasks';
const ENTITY_NAME = 'task';

const getExtraErrorMsg = boardId => `on board with id ${boardId}`;

const getAll = async boardId => DB.getAllEntities(TABLE_NAME, boardId);

const getById = async (boardId, id) => {
  const board = await DB.getEntityById(TABLE_NAME, id, boardId);
  if (!board) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
  return board;
};

const create = async (boardId, task) =>
  DB.createEntity(TABLE_NAME, task, boardId);

const update = async (boardId, id, task) => {
  const updatedTask = await DB.updateEntity(TABLE_NAME, id, task, boardId);
  if (!updatedTask) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
  return updatedTask;
};

const remove = async (boardId, id) => {
  if (!(await DB.deleteEntity(TABLE_NAME, id, boardId))) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
};

const removeAll = async boardId => {
  const tasks = await getAll(boardId);
  tasks.forEach(async task => {
    await remove(boardId, task.id);
  });
};

module.exports = { getAll, getById, create, update, remove, removeAll };
