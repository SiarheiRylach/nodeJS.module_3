"use strict";

const clp = require("clp");
const OperationWorker = require("./operations");
const pathStore = './notes.json';

const args = clp(process.argv.slice(2));

let operationWorker = new OperationWorker(pathStore);

switch(args['operation']){
    case 'add':
        if(args['title'] && args['body']){
            operationWorker.add(args['title'], args['body']);
        }else{
            console.log("Error, you should set title and body with --title and --body");
        }
        break;

    case 'list':
        operationWorker.list();
        break;

    case 'remove':
        if(args['title']){
            operationWorker.remove(args['title']);
        }else{
            console.log("Error, you should set title with --title");
        }
        break;

    case 'read':
        if(args['title']){
            operationWorker.read(args['title']);
        }else{
            console.log("Error, you should set title with --title");
        }
        break;

    default:
        console.log("Use correct command like: \n'node index --operation=add --title=test --body=test'" +
                    "\n'node index --operation=remove --title=test'" +
                    "\n'node index --operation=read --title=test'" +
                    "\n'node index --operation=list'"
        );
}
