const Importer = require('./importer');

const importer = new Importer();

/*importer.import('./output').then((data)=>{
    console.log(data);
});
console.log("hi");*/
console.log(importer.importSync('./output'));
console.log("hi");



