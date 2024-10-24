const express = require('express');
const router = express.Router();
const path = require('path');
const logrequest = require('../middlewares/LoggerMiddleware');
const validationrequest = require('../middlewares/ValidationMiddleware');
const heroController = require('../controllers/HeroController');

router.get('/heroes',heroController.getAllHeroes)
router.get('/heroes/:id',heroController.getSpeceficHero)


module.exports = router;
