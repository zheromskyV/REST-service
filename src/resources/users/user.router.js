const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/').get(async (req, res) => {
  handleRoute(async () => {
    const users = await usersService.getAll();
    res.status(200).send(users.map(User.toResponse));
  }, res);
});

router.route('/:id').get(async (req, res) => {
  handleRoute(async () => {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(User.toResponse(user));
  }, res);
});

router.route('/').post(async (req, res) => {
  handleRoute(async () => {
    const { name, login, password } = req.body;

    const newUser = await usersService.create(
      new User({
        name,
        login,
        password
      })
    );

    res.status(200).send(User.toResponse(newUser));
  }, res);
});

router.route('/:id').put(async (req, res) => {
  handleRoute(async () => {
    const { name, login, password } = req.body;
    const { id } = req.params;

    const user = await usersService.update(
      id,
      new User({
        name,
        login,
        password,
        id
      })
    );

    res.status(200).send(User.toResponse(user));
  }, res);
});

router.route('/:id').delete(async (req, res) => {
  handleRoute(async () => {
    await usersService.remove(req.params.id);
    res.status(204).send('Deleted');
  }, res);
});

module.exports = router;
