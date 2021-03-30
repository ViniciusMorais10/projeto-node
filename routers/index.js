const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const router = express.Router();
router.get('/',homeController.userMiddleware, homeController.index);
router.get('/users/login',userController.login);
router.get('/users/register',userController.register);

router.get('/post/add',postController.add);
router.post('/post/add',postController.addAction);

router.get('/post/:slug/edit',postController.edit);
router.post('/post/:slug/edit',postController.editAction);

router.get('/post/:slug',postController.view); // colocar no final para nao dar conflito na url, por conta da slug. o JS executa em ordem, stilo delphi


module.exports = router;

