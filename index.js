const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const htmlTemplate = require('./helpers/getDatafromTemplates');
const dataForHTML = require('./helpers/getDatafromTemplates');


function init() {
  defaultRouting();
};

function defaultRouting() {

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'How would you like to start?',
        choices: ['I would like to customize my template', 'Blank template'],
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
        choices: ['javascript', 'lua', 'C#'],
        name: 'language',
      },
      {
        type: 'checkbox',
        message: 'What additional files will you need created?',
        choices: ['html', 'css', 'js'],
        name: 'fileChoice',
      }
    ])
    .then((answers) => {
      makeDirectoryPath(answers)
    })
}



function makeDirectoryPath(answers) {
  const { fileChoice, moduleName } = answers
  fs.mkdir(path.join(__dirname, `fivem-${answers.moduleName}`), err => err ? console.error(err) : console.log('Directory created successfully!'));
  makeFiles(fileChoice, moduleName);
};

function makeFiles(fileChoice, moduleName) {

  for (const value of fileChoice) {
    switch (value) {
      case 'html':
        data = dataForHTML(fileChoice);
        fs.writeFile(`./fivem-${moduleName}/index.html`, data, (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
          }
        });
        break;
      case 'css':
        fs.writeFile(`./fivem-${moduleName}/default.css`, data, (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
          }
        });
        break;
      case 'js':
        fs.writeFile(`./fivem-${moduleName}/default.js`, data, (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
          }
        });
        break;
    }
  }
}

init();