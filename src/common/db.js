const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const usersRepo = require('../resources/users/user.db.repository');

module.exports = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', () => console.error('DB connection error'));
  db.once('open', async () => {
    console.log('DB is connected');
    await db.dropDatabase();
    await usersRepo.create({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });
    fn();
  });
};
