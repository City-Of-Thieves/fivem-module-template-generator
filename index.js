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
  data = '';

  for (const value of fileChoice) {
    switch (value) {
      case 'html':
        fs.writeFile(`./fivem-${moduleName}/default.html`, data, (err) => {
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









/* for (const value of arguments) {
  if (value) {
    fs.writeFile(path.join(__dirname, `placeholder.${value}`), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`${value} has been created`);
    });
  }
}
}; */




init();