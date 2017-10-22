"use strict";

const fs = require('fs');

/**
 * @param {string} pathStore - path to file with notes
 */
function list(pathStore) {

        let notes = [];
        if(fs.existsSync(pathStore)){
            notes = require("." + pathStore);
        }
        return (notes.length > 0) ? notes : "You don't have notes";
}

module.exports = list;