const express = require('express');
const router = express.Router();
const path = require('path');
const heroController = require('../controllers/HeroController');


/**
 * @swagger
 * /heroes:
 *   get:
 *     summary: Hent alle helte
 *     description: Henter en liste over alle helte.
 *     responses:
 *       200:
 *         description: En liste over helte.
 */
router.get('/heroes', heroController.getAllHeroes);

/**
 * @swagger
 * /heroes/{id}:
 *   get:
 *     summary: Hent en specifik helt
 *     description: Henter en helt baseret på den angivne ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID for den helt, der skal hentes.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detaljer om den specifikke helt.
 *       404:
 *         description: Helt ikke fundet.
 */
router.get('/heroes/:id',heroController.getSpecificHero);

router.post('/heroes', heroController.createHero);

router.delete('/heroes/:id', heroController.deleteHero);

router.put('/heroes/:id', heroController.updateHero)

module.exports = router;
