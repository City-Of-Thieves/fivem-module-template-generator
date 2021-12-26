const fs = require('fs');
const path = require('path');

class FileHelper {
    static async createModuleDirectory(name) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(__dirname, `../../output/fivem-${name}`), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static async createModuleFileFromTemplate(moduleName, fileName) {
        let templateData = await FileHelper.getModuleFileTemplate(fileName);

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