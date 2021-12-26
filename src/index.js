const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const {dataForHTML , dataforLua , dataforGitIgnore} = require('./helpers/getDatafromTemplates');

function init() {
	customize();
};

function customize() {
	inquirer.prompt([
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
	});
}

function makeDirectoryPath(answers) {
	const { fileChoice, moduleName } = answers
	let updatedName = answers.moduleName.replaceAll(' ', '-');

	fs.mkdir(path.join(__dirname, `../output/fivem-${updatedName}`), err => err ? console.error(err) : console.log('Your directory has been created!\n'));
	createDefaultFiles(updatedName)
	makeCustomFiles(fileChoice, updatedName);
};

function createDefaultFiles(moduleName) {
	luaData = dataforLua();
	gitIgnoreData = dataforGitIgnore();

	fs.writeFile(path.join(__dirname, `../output/fivem-${moduleName}/fxmanifest.lua`), luaData, (err) => {
		if (err)
			console.log(err);
		else {
			console.log("Manifest file created\n");
		}
	});
	fs.writeFile(path.join(__dirname, `../output/fivem-${moduleName}/README.md`), '', (err) => {
		if (err)
			console.log(err);
		else {
			console.log("Readme file generated\n");
		}
	});
	fs.writeFile(path.join(__dirname, `../output/fivem-${moduleName}/.gitignore`), gitIgnoreData, (err) => {
		if (err)
			console.log(err);
		else {
			console.log(".gitignore file created\n");
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
						console.log("HTML file created\n");
					}
				});
				break;
			case 'css':
				fs.writeFile(`./fivem-${moduleName}/html/style.css`, '', (err) => {
					if (err)
						console.log(err);
					else {
						console.log("CSS file created\n");
					}
				});
				break;
			case 'script':
				fs.writeFile(`./fivem-${moduleName}/html/script.js`, '', (err) => {
					if (err)
						console.log(err);
					else {
						console.log("Scripting file created\n");
					}
				});
				break;
		}
	}
}

init();