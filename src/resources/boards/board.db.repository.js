const Board = require('./board.model');
const { NotFoundError } = require('../../utils/errors');

const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const getById = async id => {
  const res = await Board.findOne({ _id: id });
  if (!res) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return res;
};

const create = async board => Board.create(board);

const update = async (id, board) => Board.findOneAndUpdate({ _id: id }, board);

const remove = async id => {
  const res = await Board.remove({ _id: id });
  if (!res) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove };
