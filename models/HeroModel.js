const fs = require('fs');
const path = require('path');
const characterFilePathJSON = require ('../Heroes.json')

const getCharactersFromFile = async () => {
    return Promise.resolve(characterFilePathJSON);
};

const getSpecificCharacterFromFile = async () =>{

}


module.exports = {
    getCharactersFromFile,
    getSpecificCharacterFromFile,
}