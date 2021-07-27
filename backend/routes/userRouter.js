const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout',userController.logout);
router.post('/refresh',userController.refresh);
router.get('/auth', userController.check);

module.exports = router;