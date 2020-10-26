const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const handleRoute = require('../../utils/handleRoute');

router.route('/').get(
  handleRoute(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).send(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  handleRoute(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/').post(
  handleRoute(async (req, res) => {
    const { name, login, password } = req.body;

    const newUser = await usersService.create(
      new User({
        name,
        login,
        password
      })
    );

    res.status(200).send(User.toResponse(newUser));
  })
);

router.route('/:id').put(
  handleRoute(async (req, res) => {
    const { name, login, password } = req.body;
    const { id } = req.params;

    const user = await usersService.update(
      id,
      new User({
        name,
        login,
        password,
        _id: id
      })
    );

    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  handleRoute(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(204).send('Deleted');
  })
);

module.exports = router;
