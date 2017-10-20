"use strict";

const fs = require('fs');

function read(title, pathStore) {

    let notes = [];
    if(fs.existsSync(pathStore)){
        notes = require("." + pathStore);
    }

    console.log(notes.find(elem => elem['title'] === title));
}

module.exports = read;