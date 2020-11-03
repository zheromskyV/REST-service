const router = require('express').Router();
const loginService = require('./login.service');
const { ForbiddenError } = require('../../utils/errors');

router.post('/', async (req, res) => {
  const { login, password } = req.body;

  const token = await loginService.signToken(login, password);

  if (!token) {
    throw new ForbiddenError();
  }

  res.status(200).json({ token });
});

module.exports = router;
