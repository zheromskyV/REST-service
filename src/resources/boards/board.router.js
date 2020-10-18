const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/').get(
  handleRoute(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).send(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  handleRoute(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/').post(
  handleRoute(async (req, res) => {
    const { title, columns } = req.body;

    const newBoard = await boardsService.create(
      new Board({
        title,
        columns
      })
    );

    res.status(200).send(Board.toResponse(newBoard));
  })
);

router.route('/:id').put(
  handleRoute(async (req, res) => {
    const { title, columns } = req.body;
    const { id } = req.params;

    const board = await boardsService.update(
      id,
      new Board({
        id,
        title,
        columns
      })
    );

    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  handleRoute(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.status(204).send('Deleted');
  })
);

module.exports = router;
