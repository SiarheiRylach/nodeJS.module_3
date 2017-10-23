const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const WatchIO = require('watch.io');

class DirWatcher{
    constructor(){
        this.eventEmitter = new EventEmitter();
    }

    watch(path, delay){
        const watcher = new WatchIO({
            delay: delay
        });

        watcher.watch(path);

        watcher.on('create', file =>{
            if(getExtentionByPath(file) === '.csv'){
                this.eventEmitter.emit('dirwatcher:create', {'path':file});
            }
        });

        // Listen on file updating
        watcher.on('update', file =>{
            if(getExtentionByPath(file) === '.csv'){
                this.eventEmitter.emit('dirwatcher:update', {'path':file});
            }
        });

        // Listen on file removal
        watcher.on('remove', file =>{
            if(getExtentionByPath(file) === '.csv'){
                this.eventEmitter.emit('dirwatcher:remove', {'path':file});
            }
        });

    }
}

function getExtentionByPath(path) {
    return path.slice(-4);
}

module.exports = DirWatcher;
