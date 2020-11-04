const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const logHandler = require('./logging/logHandler');
const errorHandler = require('./logging/errorHandler');
const {
  unhandledRejection,
  uncaughtExceptionHandler
} = require('./logging/processHandlers');
const checkToken = require('./utils/checkToken');

const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logHandler);
app.use('/login', loginRouter);
app.use(checkToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use(errorHandler);

process
  .on('unhandledRejection', unhandledRejection)
  .on('uncaughtException', uncaughtExceptionHandler);

module.exports = app;
