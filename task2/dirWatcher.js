const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

class DirWatcher{
    constructor(){
        this.eventEmitter = new EventEmitter();
    }

    watch(path, delay){
        fs.watch(path, {recursive: true}, (eventType, filename) => {
           this.eventEmitter.emit('dirwatcher:changed');
        });
    }
}

module.exports = DirWatcher;


/*
смотри, у тебя будет папка data и в ней будут лежать csv файлы
нужно сделать класс DirWatcher , который будет следить за изменениями
в папке data и класс Importer, который при каком-нибудь изменении/добавлении csv файлов
будет создавать json файлы с данными из csv
 */