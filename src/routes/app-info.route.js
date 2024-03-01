const appInfoController = require('../controllers/app-info.controller')
const express = require('express');
const router = express.Router();

router.post('/', appInfoController.getAppInfo)

module.exports = router