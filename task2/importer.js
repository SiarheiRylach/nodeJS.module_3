const DirWatcher = require('./dirWatcher');
const EventEmitter = require('events').EventEmitter;
const csv = require('csvtojson');
const fs = require('fs');
const shell = require('shelljs');

class Importer{

    constructor(inputPath, outPath){
        this._inputPath = inputPath;
        this._outPath = outPath;
        createDir(outPath);
        this._buffer = [];
    }

    /**
     * this method listens events of DirWatcher
     * @param dirWatcher - object of class DirWatcher
     * @param timeout    - timeout for DirWatcher(ms)
     */
    listen(dirWatcher, timeout){
        dirWatcher.watch(this._inputPath, timeout);

        dirWatcher.eventEmitter.on('dirwatcher:create', data=>{
            this.import(data.path).then((importedData)=>{
                writeInFile(data.path, this._outPath, importedData);
            });
            //writeInFile(data.path, this._outPath, this.importSync(data.path));
        });

        dirWatcher.eventEmitter.on('dirwatcher:update', data=> {
            this.import(data.path).then((importedData)=>{
                writeInFile(data.path, this._outPath, importedData);
            });
        });

        dirWatcher.eventEmitter.on('dirwatcher:remove', data=> {
            let path = setPathOutFile(data.path, this._outPath);

            if(fs.existsSync(path)){
                fs.unlinkSync(path);
            }else{
                console.log(`File ${getNameFile(data.path)} was deleted`);
            }
        });
    }

    /**
     * Async method with imported data
     * @param pathCsv
     * @returns {Promise}
     */
    import(pathCsv){
        return new Promise((resolve, reject)=>{
            let result = [];
            csv()
                .fromFile(pathCsv)
                .on('json', (jsonObj) => {
                    result.push(jsonObj);
                })
                .on('done', (error) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(result);
                    }
                });
        });
    }

    /**
     * Sync method with imported data
     * @param pathCsv
     */
    importSync(pathCsv){
        let result = [];
        csv()
            .fromFile(pathCsv)
            .on('json', (jsonObj) => {
                result.push(jsonObj);
            })
            .on('done', (error) => {
                if(error){
                    console.log("Cannot import from .csv");
                }else{
                    return result;
                }
            });
    }

}

// private methods for this module

function writeInFile(pathCsv, destPath, data) {
    fs.writeFile(setPathOutFile(pathCsv, destPath), JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err + " Cannot write in file .json");
    });
}

//finish generate path for json
function setPathOutFile(absolutePath, outputPath) {
    if(getNameParentDir(absolutePath) === 'data'){
        return `${outputPath}/${getNameFile(absolutePath)}.json`;
    }
    outputPath += '/' + getFullPathParentDir(absolutePath);
    createDir(outputPath);

    return `${outputPath}/${getNameFile(absolutePath)}.json`;

}

//get name of file by absolute path
function getNameFile(absolutePath){
    let temp = absolutePath.split("\\");

    return temp[temp.length - 1].slice(0, -4);
}

//get name of parent dir by absolute path
function getNameParentDir(absolutePath) {
    let temp = absolutePath.split("\\");

    return  temp[temp.length - 2];
}

//if directories don't exist, it will create them all
function createDir(absolutePath) {
    if (!fs.existsSync(absolutePath)){
        shell.mkdir('-p', absolutePath);
    }
}

//it generates path for new .json file from absolute path for csv file
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

module.exports = Importer;



