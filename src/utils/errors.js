class NotFoundError extends Error {
  constructor(entity, id, extraMsg = '') {
    super(
      `There is no ${entity} with id ${id}${
        extraMsg === '' ? '' : ` ${extraMsg}`
      }`
    );
  }
}

module.exports = NotFoundError;
