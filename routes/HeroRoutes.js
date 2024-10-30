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

/**
 * @swagger
 * /heroes:
 *   post:
 *     summary: Opret en ny helt
 *     description: Opretter en ny helt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       201:
 *         description: Helt oprettet.
 *       400:
 *         description: Ugyldige input.
 */
router.post('/heroes', heroController.createHero);

/**
 * @swagger
 * /heroes/{id}:
 *   delete:
 *     summary: Slet en helt
 *     description: Sletter en helt baseret på den angivne ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID for den helt, der skal slettes.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Helt slettet.
 *       404:
 *         description: Helt ikke fundet.
 */
router.delete('/heroes/:id', heroController.deleteHero);

/**
 * @swagger
 * /heroes/{id}:
 *   put:
 *     summary: Opdater en helt
 *     description: Opdaterer en helt baseret på det angivne ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID for den helt, der skal opdateres.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Helt opdateret.
 *       404:
 *          description: Helt ikke fundet.
 */
router.put('/heroes/:id', heroController.updateHero);

module.exports = router;
