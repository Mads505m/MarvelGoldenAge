const fs = require('fs').promises;
const path = require('path');
const HERO_FILE_PATH = path.join(__dirname, '../Heroes.json');

const saveHeroes = async (heroes) => {
    try {
        await fs.writeFile(HERO_FILE_PATH, JSON.stringify(heroes, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving heroes:', error.message);
        throw new Error('Could not save heroes');
    }
};

const getCharactersFromFile = async () => {
    try {
        const data = await fs.readFile(HERO_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading the character file: ' + error.message);
    }
};

const getSpecificCharacterFromFile = async (heroid) => {
    try {
        const characters = await getCharactersFromFile();
        return characters.find(hero => hero.id === Number(heroid));
    } catch (error) {
        throw new Error('Error fetching specific character: ' + error.message);
    }
}

const createHeroModel = async (newHero) => {
    try {
        const heroes = await getCharactersFromFile();
        const maxId = heroes.reduce((max, hero) => Math.max(max, hero.id), 0);
        const newId = maxId + 1;

        const heroToSave = {
            id: newId,
            name: newHero.name,
            alias: newHero.alias,
            powers: newHero.powers
        };

        heroes.push(heroToSave);
        await saveHeroes(heroes);
        return heroToSave;

    } catch (error) {
        throw new Error(`Error creating hero: ${error.message}`);
    }
};
const updateHeroById = async (id, updatedHero) => {
    try {
        const data = await fs.readFile(HERO_FILE_PATH, 'utf-8');
        const heroes = JSON.parse(data);
        const heroIndex = heroes.findIndex(hero => hero.id === id);

        const updatedHeroWithId = { id, ...updatedHero };
        heroes[heroIndex] = updatedHeroWithId;
        await saveHeroes(heroes);

    } catch (error) {
        throw new Error(`Error updating hero: ${error.message}`);
    }
}

const deleteHeroById = async (id) => {
    try {
        const data = await fs.readFile(HERO_FILE_PATH, 'utf-8');
        const heroes = JSON.parse(data);
        const updatedHeroes = heroes.filter(hero => hero.id !== id);

        await saveHeroes(updatedHeroes); // Save the filtered list
    } catch (error) {
        throw new Error(`Error deleting hero: ${error.message}`);
    }
};

module.exports = {
    getCharactersFromFile,
    getSpecificCharacterFromFile,
    deleteHeroById,
    updateHeroById,
    createHeroModel
}