"use strict";

const fs = require('fs');

/**
 * @param {string} title  - title of note
 * @param {string} pathStore - path to file with notes
 */
function read(title, pathStore) {

    let notes = [];
    if(fs.existsSync(pathStore)){
        notes = require("." + pathStore);
    }
    let detectedNote = notes.find(elem => elem['title'] === title);

    return (detectedNote) ? detectedNote : "Note with this title doesn't exist";
}

module.exports = read;