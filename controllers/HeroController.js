const heroModel = require('../models/HeroModel');


const getAllHeroes = async (req, res) => {
    try {
        const characters = await heroModel.getCharactersFromFile();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error: error.message });
    }
};


const getSpecificHero = async (req, res) => {
        const { id } = req.params;
    try {
        const character = await heroModel.getSpecificCharacterFromFile(id)
        res.json(character);
    } catch(error){
            res.status(500).json({ message: 'Error fetching specific hero', error: error.message });
        }
}

const createHero = async (req, res) => {
    try {
        const newHero = req.body;
        const createdHero = await heroModel.createHeroModel(newHero);
        res.status(201).json({ message: 'Hero created successfully', hero: createdHero });
    } catch (error) {
        res.status(500).json({ message: 'Error creating hero', error: error.message });
    }
};

const updateHero = async (req, res) => {
    const { id } = req.params;
    const heroId = parseInt(id, 10);
    try {
        const updatedHero = req.body;
        await heroModel.updateHeroById(heroId, updatedHero);
        res.json({ message: `Hero with id: ${heroId} has been updated` });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
}

const deleteHero = async (req, res) => {
    const { id } = req.body;
    const heroId = parseInt(id, 10);
    try {
        await heroModel.deleteHeroById(heroId);
        res.json({ message: 'Hero deleted successfully)'});
    } catch (error){
        res.status(500).json({ message: 'Error deleting a hero', error: error.message });
    }
}

module.exports = {
    getAllHeroes,
    getSpecificHero,
    updateHero,
    deleteHero,
    createHero
}