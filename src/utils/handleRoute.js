const NotFoundError = require('./errors');

const handleRoute = (func, response) => {
  return func()
    .then(res => res)
    .catch(error => {
      if (error instanceof NotFoundError) {
        response.status(404).send(error.message);
      } else {
        response.status(500).send('Internal error');
      }
    });
};

module.exports = handleRoute;
