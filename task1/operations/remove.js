"use strict";

const fs = require('fs');

function remove(title, pathStore) {

    let notes = [];
    if(fs.existsSync(pathStore)){
        notes = require("." + pathStore);
    }

    let lengthBefore = notes.length;

    notes = notes.filter( elem => elem['title'] !== title);

    if(lengthBefore === notes.length){
        console.log("Note with this title doesn't exist");
    }else {
        console.log("Successfully removed");
    }

    fs.writeFile(pathStore, JSON.stringify(notes), (err)=>{
        if(err) throw err;
    });
}

module.exports = remove;