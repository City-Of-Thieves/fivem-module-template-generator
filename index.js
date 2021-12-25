const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const {dataForHTML , dataforLua} = require('./helpers/getDatafromTemplates');



function init() {
  customize();
};

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
        choices: ['html', 'css', 'script'],
        name: 'fileChoice',
      }
    ])
    .then((answers) => {
      makeDirectoryPath(answers)
    })
}

function makeDirectoryPath(answers) {
  const { fileChoice, moduleName } = answers
  fs.mkdir(path.join(__dirname, `fivem-${answers.moduleName}`), err => err ? console.error(err) : console.log('Directory created successfully!\n'));
  makeFiles(fileChoice, moduleName);
};

function makeFiles(fileChoice, moduleName) {
  htmlData = dataForHTML(fileChoice);
  luaData = dataforLua();
  
  for (const value of fileChoice) {
    switch (value) {
      case 'html':
        fs.mkdir(path.join(__dirname, `fivem-${moduleName}/html`), err => err ? console.error(err) : console.log('HTML directory created successfully!\n'));
        fs.writeFile(`./fivem-${moduleName}/html/index.html`, htmlData, (err) => {
          if (err)
            console.log(err);
          else {
            console.log("HTML file created successfully\n");
          }
        });
        break;
      case 'css':
        fs.writeFile(`./fivem-${moduleName}/style.css`, '', (err) => {
          if (err)
            console.log(err);
          else {
            console.log("CSS file created successfully\n");
          }
        });
        break;
      case 'script':
        fs.writeFile(`./fivem-${moduleName}/script.js`, '', (err) => {
          if (err)
            console.log(err);
          else {
            console.log("Scripting file created successfully\n");
          }
        });
        break;
    }
  }
  fs.writeFile(`./fivem-${moduleName}/fxmanifest.lua`, luaData, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Manifest file created\n");
    }
  });
  fs.writeFile(`./fivem-${moduleName}/README.md`, '', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Readme generated\n");
    }
  });
}

function includeCSS(filename) {
    let file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("type", "text/css");
    file.setAttribute("href", filename);
    document.head.appendChild(file);
 }

 function includeScript(filename) {
  let file = document.createElement("link");
  file.setAttribute("src", filename);
  document.body.appendChild(file);
}

function blankTemplate() {
  
}

init();





/* function defaultRouting() {

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
} */