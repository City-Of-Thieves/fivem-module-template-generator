const fs = require('fs');
const path = require('path');

const dataForHTML = (fileChoice) => {
    return fs.readFileSync(path.join(__dirname, '../templates/indexJSandCSS.html'))
}

module.exports = dataForHTML;