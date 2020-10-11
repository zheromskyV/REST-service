const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/:boardId/tasks').get(async (req, res) => {
  handleRoute(async () => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).send(tasks.map(Task.toResponse));
  }, res);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  handleRoute(async () => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    res.status(200).send(Task.toResponse(task));
  }, res);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  handleRoute(async () => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const newTask = await tasksService.create(
      boardId,
      new Task({
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      })
    );

    res.status(200).send(Task.toResponse(newTask));
  }, res);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  handleRoute(async () => {
    const { boardId, taskId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.update(
      boardId,
      taskId,
      new Task({
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      })
    );

    res.status(200).send(Task.toResponse(task));
  }, res);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  handleRoute(async () => {
    const { boardId, taskId } = req.params;

    await taskId.remove(boardId, taskId);
    res.status(204).send('Deleted');
  }, res);
});

module.exports = router;
