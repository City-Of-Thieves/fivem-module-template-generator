const inquirer = require('inquirer');
const FileHelper = require(`${__dirname}/helpers/FileHelper`);
const PromptHelper = require(`${__dirname}/helpers/PromptHelper`);
const FileNameHelper = require(`${__dirname}/helpers/FileNameHelper`);

// TODO: Need to add the other supported languages
async function createModule() {
	try {
		let moduleInfo = await inquirer.prompt(PromptHelper.getAll());

		await FileHelper.createModuleDirectory(moduleInfo.moduleName);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'README.md', moduleInfo);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, '.gitignore', moduleInfo);
		await FileHelper.createModuleFileFromTemplate(moduleInfo.moduleName, 'fxmanifest.lua', moduleInfo);

		moduleInfo.scriptTypes.forEach(async scriptType => {
			await FileHelper.createEmptyFile(moduleInfo.moduleName, `${scriptType}.js`);
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