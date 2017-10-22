"use strict";

const fs = require('fs');

function list(pathStore) {

        let notes = [];
        if(fs.existsSync(pathStore)){
            notes = require("." + pathStore);
        }
        return (notes.length > 0) ? notes : "You don't have notes";
}

module.exports = list;