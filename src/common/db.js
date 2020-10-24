const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

module.exports = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', () => console.error('DB connection error'));
  db.once('open', () => {
    console.log('DB is connected');
    fn();
  });
};
