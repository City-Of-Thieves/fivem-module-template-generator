const inquirer = require('inquirer');
const FileHelper = require(`${__dirname}/helpers/FileHelper`);

async function createModule() {
	try {
		let moduleInfo = await collectModuleInfo();

		await FileHelper.createModuleDirectory(moduleInfo.moduleName);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'README.md');
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, '.gitignore');
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'fxmanifest.lua');
	} catch (error) {
		console.log(error);
	}
}

function getInquirierPrompt(type, message, name, choices=null) {
	let prompt = {
		type: type,
		message: message,
		name: name,
	};

	if (Array.isArray(choices)) {
		prompt.choices = choices;
	}

	return prompt;
}

async function collectModuleInfo() {
	let prompts = [];
	prompts.push(getInquirierPrompt('input', 'What is the name of the module?', 'moduleName'));
	prompts.push(getInquirierPrompt('list', 'What language will you be coding in', 'language', ['javascript', 'lua', 'C#']));
	prompts.push(getInquirierPrompt('checkbox', 'What type of scripts will you need', 'scriptTypes', ['client', 'server']));
	prompts.push(getInquirierPrompt('checkbox', 'What additional files will you need created?', 'fileChoice', ['html', 'css', 'script']));

	return await inquirer.prompt(prompts);
}

createModule();