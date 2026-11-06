const express = require('express');
const authRouter = express.Router();

const authController = require('../controller/auth');

authRouter.get('/login', authController.getlogin);

authRouter.post('/login', authController.postlogin);

authRouter.post("/logout", authController.postlogout);

authRouter.get('/signup', authController.getsignup);

authRouter.post('/signup', authController.postsignup);

module.exports = authRouter;
