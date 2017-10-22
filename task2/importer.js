const DirWatcher = require('./dirWatcher');
const EventEmitter = require('events').EventEmitter;

class Importer{
    constructor(){
        this.dirWatcher = new DirWatcher();
        this.dirWatcher.eventEmitter.on('dirwatcher:changed', function () {
            console.log('changed');
        });
    }

    import(path){
        this.dirWatcher.watch(path);

    }
}

module.exports = Importer;