const inquirer = require('inquirer');
const fs = require('fs');


function init() {
    defaultRouting();
};


function defaultRouting() {

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'How would you like to start?',
                choices: ['Blank template', 'I would like to customize my template'],
                name: 'defaultYN',
            },
        ])
        .then((answers) => {
            if (answers.defaultYN === 'Default no inputs please') return answers;
            customize();
        });
}

function customize() {

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the module?',
                name: 'moduleName',
            },
            {
                type: 'list',
                message: 'What language will you be coding in?',
                choices: ['javascript', 'lua' , 'C#'],
                name: 'language',
            },
            {
                type: 'confirm',
                message: 'Are you creating a UI?',
                name: 'html',
            },
            {
                type: 'confirm',
                message: 'Are you writing any Javascript?',
                name: 'js',
            },
            {
                type: 'confirm',
                message: 'Will you need need a .css file?',
                name: 'css',
                when(answers) {
                    return answers.html === true;
                }
            },
            {
                type: 'input',
                message: 'What is the name of the module?',
                name: 'moduleName',
            }
        ])
        .then((answers) => {
            console.log('set 2', answers)
        });
}



init();