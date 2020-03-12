// const fs = require('fs');
const pdf = require('html-pdf');
const html = require("./generateHTML");
const options = { format: 'Letter' };
const inquirer = require("inquirer");
const axios = require("axios");

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
        const queryUrl = `https://api.github.com/users/${github}`;
        axios.get(queryUrl).then(function (res) {
            console.log('Github response: ' + res.data, color);
        const profileHTML = html({color, ...res.data})
            
            pdf.create(profileHTML, options).toFile('./-Profile-Generator.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res);
            });
        
        }).catch(err => {
            console.log(`User not found - ${github}`);
            process.exit(1);
        });
    });


};

init();