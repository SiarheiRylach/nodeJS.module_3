const Importer = require('./importer');

const importer = new Importer('./data', './output');
const DirWatcher = require('./dirWatcher');

let dirWatcher = new DirWatcher();

importer.listen(dirWatcher, 500);

console.log("hi");


