// const fs = require('fs');
const pdf = require('html-pdf');
const html = require("./generateHTML");
const options = { format: 'Letter' };
const inquirer = require("inquirer");
const axios = require("axios");
let data = {};

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
            data = {...res.data};
            data.color = color;

            axios // axios call to get the stars
                .get(`https://api.github.com/users/${github}/repos?per_page=100`)
                .then((res) => {

                    data.stars = 0;
                    for (let i = 0; i < res.data.length; i++) {
                        data.stars += res.data[i].stargazers_count;
                    }
                });
                const profileHTML = html(data)
            pdf.create(profileHTML, options).toFile('./Profile-Generator.pdf', function (err, res) {
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

