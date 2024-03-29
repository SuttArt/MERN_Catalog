const Router = require('express');
const router = new Router;

const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');

router.use('/user', userRouter);
router.use('/item', itemRouter);

module.exports = router;