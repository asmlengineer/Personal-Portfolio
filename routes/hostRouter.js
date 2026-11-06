const express = require('express');
const hostRouter = express.Router();
const path = require('path');

const rootDir = require('../utils/pathUtil');

const {
    getabout,
    getcontact,
    getskills,
    getproject } = require('../controller/port');

hostRouter.get("/about", getabout);

hostRouter.get("/contact", getcontact);

hostRouter.get("/skills", getskills);

hostRouter.get("/project", getproject);

module.exports = hostRouter;