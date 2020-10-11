const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  users: [
    new User({ name: 'Abc', login: 'qwerty', password: '1234' }),
    new User({ name: 'Dfe', login: 'ytrewq', password: '5678' }),
    new User({ name: 'Jhi', login: 'qweytr', password: '9012' })
  ],
  boards: [
    new Board({ title: 'board1' }),
    new Board({ title: 'board2' }),
    new Board({ title: 'board3' })
  ],
  tasks: {}
};

// create tasks
(() => {
  DB.tasks[DB.boards[0].id] = [];
  DB.tasks[DB.boards[0].id].push(
    new Task({
      title: 'task 1',
      order: 0,
      userId: DB.users[0].id,
      boardId: DB.boards[0].id,
      columnId: DB.boards[0].columns[0].id
    })
  );
  DB.tasks[DB.boards[0].id].push(
    new Task({
      title: 'task 2',
      order: 1,
      userId: DB.users[1].id,
      boardId: DB.boards[0].id,
      columnId: DB.boards[0].columns[0].id
    })
  );

  DB.tasks[DB.boards[1].id] = [];
  DB.tasks[DB.boards[1].id].push(
    new Task({
      title: 'task 3',
      order: 0,
      userId: DB.users[0].id,
      boardId: DB.boards[1].id,
      columnId: DB.boards[1].columns[0].id
    })
  );
})();

DB.getAllEntities = async (tableName, innerKey) =>
  innerKey === undefined ? [...DB[tableName]] : [...DB[tableName][innerKey]];

DB.getEntityById = async (tableName, id, innerKey) => {
  const table =
    innerKey === undefined ? DB[tableName] : DB[tableName][innerKey];
  return table.filter(entity => id === entity.id)[0];
};

DB.createEntity = async (tableName, entity, innerKey) => {
  if (innerKey === undefined) {
    DB[tableName].push(entity);
  } else {
    if (!Array.isArray(DB[tableName][innerKey])) {
      DB[tableName][innerKey] = [];
    }
    DB[tableName][innerKey].push(entity);
  }
  return DB.getEntityById(tableName, entity.id, innerKey);
};

DB.updateEntity = async (tableName, id, entity, innerKey) => {
  const oldEntity = await DB.getEntityById(tableName, id, innerKey);
  if (oldEntity) {
    const table =
      innerKey === undefined ? DB[tableName] : DB[tableName][innerKey];
    table[table.indexOf(oldEntity)] = { ...entity };
  }
  return DB.getEntityById(tableName, id, innerKey);
};

DB.deleteEntity = async (tableName, id, innerKey) => {
  const entityToDelete = await DB.getEntityById(tableName, id, innerKey);
  if (entityToDelete) {
    const table =
      innerKey === undefined ? DB[tableName] : DB[tableName][innerKey];
    table.splice(table.indexOf(entityToDelete), 1);
    return true;
  }
  return false;
};

module.exports = DB;
