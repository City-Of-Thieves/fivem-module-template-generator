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



module.exports = {dataForHTML , dataforLua};



/* if (fileChoice.includes('html') && fileChoice.includes('css') && fileChoice.includes('js')) {
    return fs.readFileSync(path.join(__dirname, '../templates/html/indexJSandCSS.html'))
}
if (fileChoice.includes('html') && fileChoice.includes('css')) {
    return fs.readFileSync(path.join(__dirname, '../templates/html/indexCSS.html'))
}
if (fileChoice.includes('html') && fileChoice.includes('js')) {
    return fs.readFileSync(path.join(__dirname, '../templates/html/indexJS.html'))
} */