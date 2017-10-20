"use strict";

const fs = require('fs');

function list(pathStore) {

        let notes = [];
        if(fs.existsSync(pathStore)){
            notes = require("." + pathStore);
        }
        console.log(notes);
}

module.exports = list;