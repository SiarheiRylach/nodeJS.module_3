const add = require('./add');
const list = require('./list');
const read = require('./read');
const remove = require('./remove');

class OperationsWorker{
    constructor(pathStore){
        this.pathStore = pathStore;
    }

    add(title, body, path = this.pathStore){
        add(title, body, path);
    }

    list(path = this.pathStore){
        list(path);
    }

    read(title, path = this.pathStore){
        read(title, path);
    }

    remove(title, path = this.pathStore){
        remove(title, path);
    }


}

module.exports = OperationsWorker;