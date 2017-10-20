"use strict";

const clp = require("clp");
const pathStore = './notes.json';
const add = require('./operations/add');
const list = require('./operations/list');
const read = require('./operations/read');
const remove = require('./operations/remove');

const args = clp(process.argv.slice(2));
switch(args['operation']){
    case 'add':
        if(args['title'] && args['body']){
            add(args['title'], args['body'], pathStore);
        }else{
            console.log("Error, you should set title and body with --title and --body");
        }
        break;

    case 'list':
        list(pathStore);
        break;

    case 'remove':
        if(args['title']){
            remove(args['title'], pathStore);
        }else{
            console.log("Error, you should set title with --title");
        }
        break;

    case 'read':
        if(args['title']){
            read(args['title'], pathStore);
        }else{
            console.log("Error, you should set title with --title");
        }
        break;

    default:
        console.log("Use correct command like: 'node index --operation=add --title=test --body=test'");
}
