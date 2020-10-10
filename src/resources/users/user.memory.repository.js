const DB = require('../../common/inMemory');
const { users: usersDB } = DB;

const getAll = async () => {
  return usersDB;
};

module.exports = { getAll };
