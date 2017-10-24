const clp = require("clp");
const Importer = require('./importer');

const args = clp(process.argv.slice(2));

if(args['input'] && args['output']) {
    const importer = new Importer(args['input'], args['output']);
    const DirWatcher = require('./dirWatcher');

    let dirWatcher = new DirWatcher();

    importer.listen(dirWatcher, 500);
    console.log("hi");
}else{
   console.log("Use correct command like: \n'node index --input=./data --output=./output");
}




