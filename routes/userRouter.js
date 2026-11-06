const express = require('express');

const userRouter = express.Router();

const path = require('path');

const rootDir = require('../utils/pathUtil');

const { 
 getHome, 
 getnotes,
 getsignup } = require('../controller/folio');

const { getlogin } = require('../controller/auth');
 
userRouter.get("/home", (req, res, next) =>{
    res.render('Home',{
        isLoggedIn: req.isLoggedIn
    });
});

userRouter.get("/", getHome);

userRouter.get("/notes", getnotes);

userRouter.get("/login", getlogin);

module.exports = userRouter;