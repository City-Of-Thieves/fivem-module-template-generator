const fs = require('fs');
const path = require('path');
const TemplateHelper = require(path.join(__dirname, `/TemplateHelper`));

class FileHelper {
    static async createModuleDirectory(name, subdir='') {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(__dirname, `../../output/fivem-${name}${subdir}`), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static async createEmptyFile(moduleName, fileName) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, `../../output/fivem-${moduleName}/${fileName}`), '', (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();   
            });
        });
    }

    static async createModuleFileFromTemplate(moduleName, fileName, moduleInfo) {
        let templateData = await FileHelper.getModuleFileTemplate(fileName);
        templateData = TemplateHelper.swapTemplateData(fileName, templateData, moduleInfo);

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, `../../output/fivem-${moduleName}/${fileName}`), templateData, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();   
            });
        });
    }

    static async getModuleFileTemplate(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, `../templates/${name}`), (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
}

module.exports = FileHelper;