const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  const newUser = await usersService.create(
    new User({
      name,
      login,
      password
    })
  );

  res.status(200).send(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).send('Deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
