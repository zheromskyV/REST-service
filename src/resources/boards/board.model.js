const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  title: { type: String, default: 'BOARD' },
  columns: {
    type: [
      {
        _id: { type: String, default: uuid },
        title: { type: String, default: 'COLUMN' },
        order: { type: Number, default: 0 }
      }
    ],
    default: []
  }
});

boardSchema.statics.toResponse = board => ({ ...board });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
