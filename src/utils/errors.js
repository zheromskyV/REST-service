class NotFoundError extends Error {
  constructor(entity, id, extraMsg = '') {
    super(
      `There is no ${entity} with id ${id}${
        extraMsg === '' ? '' : ` ${extraMsg}`
      }`
    );
  }
}

class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized user!');
  }
}

class ForbiddenError extends Error {
  constructor() {
    super('Forbidden!');
  }
}

module.exports = { NotFoundError, UnauthorizedError, ForbiddenError };
