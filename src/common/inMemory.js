const User = require('../resources/users/user.model');

const DB = {
  users: [
    new User({ name: 'Abc', login: 'qwerty', password: '1234' }),
    new User({ name: 'Dfe', login: 'ytrewq', password: '5678' }),
    new User({ name: 'Jhi', login: 'qweytr', password: '9012' })
  ]
};

DB.getAllEntities = async tableName => [...DB[tableName]];

DB.getEntityById = async (tableName, id) =>
  DB[tableName].filter(entity => id === entity.id)[0];

DB.createEntity = async (tableName, entity) => {
  DB[tableName].push(entity);
  return DB.getEntityById(tableName, entity.id);
};

DB.updateEntity = async (tableName, id, entity) => {
  const oldEntity = await DB.getEntityById(tableName, id);
  if (oldEntity) {
    const table = DB[tableName];
    table[table.indexOf(oldEntity)] = { ...entity };
  }
  return DB.getEntityById(tableName, id);
};

DB.deleteEntity = async (tableName, id) => {
  const entityToDelete = await DB.getEntityById(tableName, id);
  if (entityToDelete) {
    const table = DB[tableName];
    table.splice(table.indexOf(entityToDelete), 1);
    return true;
  }
  return false;
};

module.exports = DB;
