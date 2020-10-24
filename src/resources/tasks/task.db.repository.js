const NotFoundError = require('../../utils/errors');
const Task = require('./task.model');

const ENTITY_NAME = 'task';

const getExtraErrorMsg = boardId => `on board with id ${boardId}`;

const getAll = async boardId => await Task.find({ boardId });

const getById = async (boardId, id) => {
  const board = await Task.findOne({ _id: id, boardId });
  if (!board) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
  return board;
};

const create = async (boardId, task) => Task.create({ ...task, boardId });

const update = async (boardId, id, task) => {
  const updatedTask = await Task.updateOne(
    { _id: id, boardId },
    { ...task, boardId }
  );
  console.log('xxx', updatedTask);
  if (!updatedTask) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
  return updatedTask;
};

const remove = async (boardId, id) => {
  if ((await Task.deleteOne({ _id: id, boardId })).ok === 0) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
};

const removeAll = async boardId => {
  // const tasks = await getAll(boardId);
  // tasks.forEach(async task => {
  //   await remove(boardId, task.id);
  // });
  await Task.deleteMany({ boardId });
};

const unassignUser = async userId => {
  // const boardTasks = await getAll(undefined);
  // const tasks = Object.values(boardTasks);
  // tasks.flat().forEach(async task => {
  //   if (task.userId === userId) {
  //     await update(task.boardId, task.id, new Task({ ...task, userId: null }));
  //   }
  // });
  const allTasks = await Task.find({});
  allTasks.forEach(async task => {
    await Task.updateOne({ userId }, { ...task, userId: null });
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
