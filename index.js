const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('./generateHTML.js', 'utf8');
const options = { format: 'Letter' };

pdf.create(html, options).toFile('./Profile-Generator.pdf', function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});



const questions = [
  
];

function writeToFile(fileName, data) {
    
}

function init() {

}

init();