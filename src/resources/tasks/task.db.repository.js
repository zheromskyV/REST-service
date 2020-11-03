const Task = require('./task.model');
const { NotFoundError } = require('../../utils/errors');

const ENTITY_NAME = 'task';

const getExtraErrorMsg = boardId => `on board with id ${boardId}`;

const getAll = async boardId => Task.find({ boardId });

const getById = async (boardId, id) => {
  const res = await Task.findOne({ boardId, _id: id });
  if (!res) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
  return res;
};

const create = async (boardId, task) => Task.create(task);

const update = async (boardId, id, task) =>
  Task.findOneAndUpdate({ _id: id }, task);

const remove = async (boardId, id) => {
  const res = await Task.findOneAndRemove({ boardId, _id: id });
  if (!res) {
    throw new NotFoundError(ENTITY_NAME, id, getExtraErrorMsg(boardId));
  }
};

const removeAll = async boardId => Task.deleteMany({ boardId });

const unassignUser = async userId => {
  await Task.updateMany({ userId }, { userId: null });
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
