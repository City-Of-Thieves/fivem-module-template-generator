const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      message: '',
      name: '',
    }
  ])
  .then((answers) => {
    console.log(answers)
  });