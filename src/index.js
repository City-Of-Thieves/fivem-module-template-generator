const inquirer = require('inquirer');
const FileHelper = require(`${__dirname}/helpers/FileHelper`);
const PromptHelper = require(`${__dirname}/helpers/PromptHelper`);

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

async function collectModuleInfo() {
	return await inquirer.prompt(PromptHelper.getAll());
}

createModule();