const add = require('./add');
const list = require('./list');
const read = require('./read');
const remove = require('./remove');


class OperationsWorker{
    /**
     * Create a object which contains all functions to work with notes
     * @param {string} pathStore - path to file with notes
     */
    constructor(pathStore){
        this.pathStore = pathStore;
    }

    add(title, body, path = this.pathStore){
        add(title, body, path);
    }

    list(path = this.pathStore){
        return list(path);
    }

    read(title, path = this.pathStore){
        return read(title, path);
    }

    remove(title, path = this.pathStore){
        remove(title, path);
    }


}

module.exports = OperationsWorker;