const { PORT } = require('./common/config');
const app = require('./app');
const {
  unhandledRejection,
  uncaughtExceptionHandler
} = require('./logging/processHandlers');

process
  .on('unhandledRejection', unhandledRejection)
  .on('uncaughtException', uncaughtExceptionHandler);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
