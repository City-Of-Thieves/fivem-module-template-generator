const fs = require('fs');
const path = require('path');

const dataForHTML = (fileChoice) => {
    if (fileChoice.includes('html')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/index.html'))
    }
}
const dataforLua = (fileChoice) => {
        return fs.readFileSync(path.join(__dirname, '../templates/fxmanifest.lua'))
}

const dataforGitIgnore = (fileChoice) => {
    return fs.readFileSync(path.join(__dirname, '../templates/.gitignore'))
}



module.exports = {dataForHTML , dataforLua , dataforGitIgnore};
