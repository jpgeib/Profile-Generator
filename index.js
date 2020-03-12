const fs = require('fs');
const pdf = require('html-pdf');
const html = require("./generateHTML");
const options = { format: 'Letter' };


// fs.readFileSync('./generateHTML.js', 'utf8');


const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

// function writeToFile(fileName, data) {

// };

function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
        console.log("Searching...");
        axios.get(`https://api.github.com/users/${github}`).then(function (res) {
            const profileHTML = html({color, res})
            console.log('Github response: ' + res);
            pdf.create(profileHTML, options).toFile('./Profile-Generator.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res);
            });
        })
    });


};

init();