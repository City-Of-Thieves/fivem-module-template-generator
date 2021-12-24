const fs = require('fs');
const path = require('path');

const dataForHTML = (fileChoice) => {
    console.log(fileChoice)
    if (fileChoice.includes('html') && fileChoice.includes('css') && fileChoice.includes('js')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/indexJSandCSS.html'))
    }
    if (fileChoice.includes('html') && fileChoice.includes('css')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/indexCSS.html'))
    }
    if (fileChoice.includes('html') && fileChoice.includes('js')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/indexJS.html'))
    }
    if (fileChoice.includes('html')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/index.html'))
    }
}



module.exports = dataForHTML;