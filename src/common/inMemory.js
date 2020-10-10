const User = require('../resources/users/user.model');

const DB = {
  users: [
    new User({ name: 'Abc', login: 'qwerty', password: '1234' }),
    new User({ name: 'Dfe', login: 'ytrewq', password: '5678' }),
    new User({ name: 'Jhi', login: 'qweytr', password: '9012' })
  ]
};

module.exports = DB;
