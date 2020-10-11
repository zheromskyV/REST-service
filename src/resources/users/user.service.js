const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = id => {
  usersRepo.remove(id);
  tasksService.unassignUser(id);
};

module.exports = { getAll, getById, create, update, remove };
