const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/').get(async (req, res) => {
  handleRoute(async () => {
    const boards = await boardsService.getAll();
    res.status(200).send(boards.map(Board.toResponse));
  }, res);
});

router.route('/:id').get(async (req, res) => {
  handleRoute(async () => {
    const board = await boardsService.getById(req.params.id);
    res.status(200).send(Board.toResponse(board));
  }, res);
});

router.route('/').post(async (req, res) => {
  handleRoute(async () => {
    const { title, columns } = req.body;

    const newBoard = await boardsService.create(
      new Board({
        title,
        columns
      })
    );

    res.status(200).send(Board.toResponse(newBoard));
  }, res);
});

router.route('/:id').put(async (req, res) => {
  handleRoute(async () => {
    const { title, columns } = req.body;
    const { id } = req.params;

    const board = await boardsService.update(
      id,
      new Board({
        title,
        columns
      })
    );

    res.status(200).send(Board.toResponse(board));
  }, res);
});

router.route('/:id').delete(async (req, res) => {
  handleRoute(async () => {
    await boardsService.remove(req.params.id);
    res.status(204).send('Deleted');
  }, res);
});

module.exports = router;
