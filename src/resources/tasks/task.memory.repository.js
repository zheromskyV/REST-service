const DB = require('../../common/inMemory');
const NotFoundError = require('../../utils/errors');
const Task = require('./task.model');

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

const unassignUser = async userId => {
  const boardTasks = await getAll(undefined);
  const tasks = Object.values(boardTasks);
  tasks.flat().forEach(async task => {
    if (task.userId === userId) {
      await update(task.boardId, task.id, new Task({ ...task, userId: null }));
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
  unassignUser
};
