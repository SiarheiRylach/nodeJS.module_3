"use strict";

const fs = require('fs');

/**
 * @param {string} title  - title of note
 * @param {string} body  - body of note
 * @param {string} pathStore - path to file with notes
 */
function add(title, body, pathStore) {
    let notes = [];
    if(fs.existsSync(pathStore)){
        notes = require("." + pathStore);
    }
    if(notes.some( elem => (elem['title'] === title)) ){
        console.log("Error! The note with this title already exist");
    }else{
        notes.push({"title": title, "body": body});
        console.log("Successfully added");
    }

    fs.writeFile(pathStore, JSON.stringify(notes), (err)=>{
        if(err) throw err;
    });
}

module.exports = add;
