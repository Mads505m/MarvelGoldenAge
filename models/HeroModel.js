const fs = require('fs');
const path = require('path');
const characterFilePathJSON = require ('../Heroes.json')


const getCharactersFromFile = () => {
    try{
        return characterFilePathJSON;
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

module.exports = {
    getCharactersFromFile,
    getSpecificCharacterFromFile,
}