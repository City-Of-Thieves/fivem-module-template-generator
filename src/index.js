const inquirer = require('inquirer');
const FileHelper = require(`${__dirname}/helpers/FileHelper`);
const PromptHelper = require(`${__dirname}/helpers/PromptHelper`);
const FileNameHelper = require(`${__dirname}/helpers/FileNameHelper`);
const LanguageHelper = require(`${__dirname}/helpers/LanguageHelper`);

async function createModule() {
	try {
		let moduleInfo = await inquirer.prompt(PromptHelper.getAll());

		await FileHelper.createModuleDirectory(moduleInfo.moduleName);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'README.md', moduleInfo);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, '.gitignore', moduleInfo);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'fxmanifest.lua', moduleInfo);

		moduleInfo.scriptTypes.forEach(async scriptType => {
			let extension = await LanguageHelper.determineExtension(moduleInfo.language);
			
			await FileHelper.createEmptyFile(moduleInfo.moduleName, `${scriptType}.${extension}`);
		});

		if (moduleInfo.fileChoice.length) {
			await FileHelper.createModuleDirectory(moduleInfo.moduleName, '/html');
			moduleInfo.fileChoice.forEach(async file => {
				await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, `html/${FileNameHelper.fileNameMap[file]}`, moduleInfo);
			});
		}
	} catch (error) {
		console.log(error);
	}
}

createModule();