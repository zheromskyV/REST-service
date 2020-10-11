const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      {
        id: uuid(),
        title: 'BOARD',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return { ...board };
  }
}

module.exports = Board;
