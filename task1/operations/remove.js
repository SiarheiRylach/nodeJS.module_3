"use strict";

const fs = require('fs');

function remove(title, pathStore) {

    let notes = [];
    if(fs.existsSync(pathStore)){
        notes = require("." + pathStore);
    }

    notes = notes.filter( elem => elem['title'] !== title);

    fs.writeFile(pathStore, JSON.stringify(notes), (err)=>{
        if(err) throw err;
    });
}

module.exports = remove;