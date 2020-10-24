const Board = require('./board.model');
const NotFoundError = require('../../utils/errors');

const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const getById = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.updateOne({ _id: id }, board);
  if (!updatedBoard) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
  return updatedBoard;
};

const remove = async id => {
  if ((await Board.deleteOne({ _id: id })).ok === 0) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = { getAll, getById, create, update, remove };
