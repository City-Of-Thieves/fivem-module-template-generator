const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const {dataForHTML , dataforLua , dataforGitIgnore} = require('./helpers/getDatafromTemplates');



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

/* function checkName(moduleName) {
  let updatedName = moduleName.split(' ').join('-');
  return updatedName;
} */

function makeDirectoryPath(answers) {
  const { fileChoice, moduleName } = answers
  let updatedName = answers.moduleName.replaceAll(' ', '-');

  fs.mkdir(path.join(__dirname, `fivem-${updatedName}`), err => err ? console.error(err) : console.log('Directory created successfully!\n'));
  createDefaultFiles(updatedName)
  makeCustomFiles(fileChoice, updatedName);
};

function createDefaultFiles(moduleName) {
  luaData = dataforLua();
  gitIgnoreData = dataforGitIgnore();

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
  fs.writeFile(`./fivem-${moduleName}/.gitignore`, gitIgnoreData, (err) => {
    if (err)
      console.log(err);
    else {
      console.log(".gitignore created\n");
    }
  });
}

function makeCustomFiles(fileChoice, moduleName) {
  htmlData = dataForHTML(fileChoice);
  
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