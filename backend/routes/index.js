const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const {
  logout,
} = require('../controllers/users');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.get('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
