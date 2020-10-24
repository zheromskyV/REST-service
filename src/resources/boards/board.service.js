const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = id => {
  boardsRepo.remove(id);
  tasksService.removeAll(id);
};

module.exports = { getAll, getById, create, update, remove };
