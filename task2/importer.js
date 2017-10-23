const DirWatcher = require('./dirWatcher');
const EventEmitter = require('events').EventEmitter;
const csv = require('csvtojson');
const fs = require('fs');
const shell = require('shelljs');

class Importer{
    constructor(){
        this._inputPath = './data';
        this.dirWatcher = new DirWatcher();
    }

    import(outPath){
        this.dirWatcher.watch(this._inputPath, 100);

        this.dirWatcher.eventEmitter.on('dirwatcher:changed', data=>{
            let result = [];
            switch(data.action){
                case 'create':
                    csv()
                        .fromFile(data.path)
                        .on('json',(jsonObj)=>{
                            result.push(jsonObj);
                        })
                        .on('done',(error)=>{
                            fs.writeFile(setPathOutFile(data.path, outPath), JSON.stringify(result), (err)=>{
                                if(err) throw err;
                            });
                        });
                    break;

                case 'update':
                    csv()
                        .fromFile(data.path)
                        .on('json',(jsonObj)=>{
                            result.push(jsonObj);
                        })
                        .on('done',(error)=>{
                            fs.writeFile(setPathOutFile(data.path, outPath), JSON.stringify(result), (err)=>{
                                if(err) throw err;
                            });
                        });
                    break;

                case 'remove':
                    let path = setPathOutFile(data.path, outPath);

                    if(fs.existsSync(path)){
                        fs.unlinkSync(path);
                    }else{
                        console.log(`File ${getNameFile(data.path)} was deleted`);
                    }

                    break;

            }
        });
    }
}

function getNameFile(absolutePath){
    let temp = absolutePath.split("\\");

    return temp[temp.length - 1].slice(0, -4);
}

function getNameParentDir(absolutePath) {
    let temp = absolutePath.split("\\");

    return  temp[temp.length - 2];
}

function createDir(absolutePath) {
    if (!fs.existsSync(absolutePath)){
        shell.mkdir('-p', absolutePath);
    }
}

function getFullPathParentDir(absolutePath) {
    let temp = absolutePath.split("\\");
    let isData = false;

    temp = orderFilter(temp);
    temp.pop();
    temp.shift();

    return temp.join("/");

    //order filter to get path from data to file
    function orderFilter(arr){
        let result   = [],
            isData = false;

        for(let i = 0; i < arr.length; ++i){
            if(arr[i] === 'data'){
                isData = true;
            }

            if(isData) result.push(arr[i]);
        }

        return result;
    }
}

function setPathOutFile(absolutePath, outputPath) {
    if(getNameParentDir(absolutePath) === 'data'){
        return `${outputPath}/${getNameFile(absolutePath)}.json`;
    }
    outputPath += '/' + getFullPathParentDir(absolutePath);
    createDir(outputPath);

    return `${outputPath}/${getNameFile(absolutePath)}.json`;

}

module.exports = Importer;



