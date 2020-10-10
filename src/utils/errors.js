class NotFoundError extends Error {
  constructor(entity, id) {
    super(`There is no ${entity} with id ${id}`);
  }
}

module.exports = NotFoundError;
