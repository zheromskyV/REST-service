const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const create = (boardId, task) => tasksRepo.create(boardId, task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = { getAll, getById, create, update, remove };
