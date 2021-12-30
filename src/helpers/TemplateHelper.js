const FileNameHelper = require(`${__dirname}/FileNameHelper`);

class TemplateHelper {
    static swapManifestTemplates(fileContent, moduleInfo) {
        let fileContentString = fileContent.toString();
        fileContentString = fileContentString.replace('{AUTHOR_NAME}', `"${moduleInfo.authorName}"`);

        let uiInclude = moduleInfo.fileChoice.includes('html') ? 'ui_page "html/index.html"' : '';
        fileContentString = fileContentString.replace('{UI_INCLUDE}', uiInclude);

        fileContentString = fileContentString.replace('{FILES_INCLUDE}', TemplateHelper.getManifestFileIncludesString(moduleInfo.fileChoice));

        let clientInclude = moduleInfo.scriptTypes.includes('client') ? `client_script "client.js"` : '';
        fileContentString = fileContentString.replace('{CLIENT_INCLUDE}', clientInclude);

        let serverInclude = moduleInfo.scriptTypes.includes('server') ? `server_script "server.js"` : '';
        fileContentString = fileContentString.replace('{SERVER_INCLUDE}', serverInclude);

        return fileContentString;
    }

    static getManifestFileIncludesString(filesSelected) {
        if (!filesSelected.length) {
            return '';
        }

        let fileInclude = 'files {\n';
        filesSelected.forEach(file => {
            fileInclude += `    "html/${FileNameHelper.fileNameMap[file]}",\n`
        });

        return `${fileInclude}}`;
    }

    static swapHtmlTemplates(fileContent, moduleInfo) {
        let fileContentString = fileContent.toString();
        
        fileContentString = fileContentString.replace('{INCLUDE_CSS}', moduleInfo.fileChoice.includes('css') ? '<link rel="stylesheet" href="index.css" />' : '');
        fileContentString = fileContentString.replace('{INCLUDE_SCRIPT}', moduleInfo.fileChoice.includes('script') ? '<script src="script.js"></script>' : '');

        return fileContentString;
    }

    static swapTemplateData(fileName, fileContent, moduleInfo) {
        if (fileName === 'fxmanifest.lua') {
            return TemplateHelper.swapManifestTemplates(fileContent, moduleInfo);
        }

        if (fileName === 'html/index.html') {
            return TemplateHelper.swapHtmlTemplates(fileContent, moduleInfo);
        }

        return fileContent;
    }
}

module.exports = TemplateHelper;