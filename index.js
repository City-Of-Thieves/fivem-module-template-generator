const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');


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
        choices: ['javascript', 'lua', 'C#'],
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
      if (answers.html) makeDirectoryPath(answers);
    })
}



function makeDirectoryPath(answers) {
  const { html, js, css } = answers;
  fs.mkdir(path.join(__dirname, `fivem-${answers.moduleName}`), err => err ? console.error(err) : console.log('Directory created successfully!'));
  makeFiles(html, js, css);
};

function makeFiles(html, js, css) {
  for (const value of arguments) {
    if (value) {
      fs.writeFile(path.join(__dirname, `placeholder.${value}`), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log(`${value} has been created`);
      });
    }
  }
};




init();