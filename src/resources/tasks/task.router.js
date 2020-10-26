const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/:boardId/tasks').get(
  handleRoute(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).send(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  handleRoute(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks').post(
  handleRoute(async (req, res) => {
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
  })
);

router.route('/:boardId/tasks/:taskId').put(
  handleRoute(async (req, res) => {
    const { boardId, taskId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.update(
      boardId,
      taskId,
      new Task({
        _id: taskId,
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      })
    );

    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  handleRoute(async (req, res) => {
    const { boardId, taskId } = req.params;

    await tasksService.remove(boardId, taskId);
    res.status(204).send('Deleted');
  })
);

module.exports = router;
