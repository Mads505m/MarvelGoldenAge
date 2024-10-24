const characterModel = require('../models/HeroModel');


const getAllHeroes = async (req, res) => {
    try {
        const characters = await characterModel.getCharactersFromFile();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error: error.message });
    }
};

const getSpeceficHero = async (req, res) => {
try{


} catch(error){
    res.status(500).json({ message: 'Error fetching specific hero', error: error.message });
}
}


module.exports = {
getAllHeroes,
getSpeceficHero
}