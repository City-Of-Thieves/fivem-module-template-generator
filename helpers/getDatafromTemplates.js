const fs = require('fs');
const path = require('path');

const dataForHTML = (fileChoice) => {
    modifyHTML(fileChoice);
    
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



const modifyHTML = (fileChoice) => {
    if (fileChoice.includes('html' && 'css')) {
        console.log('css')
        includeCSS()
    }

    if (fileChoice.includes('html' && 'css' && 'script')) {
        includeCSS();
        includeScript();
    }
} 


function includeCSS() {
    console.log('@@@@@@@@@')
    fs.readFileSync(path.join(__dirname, '../templates/html/index.html'), (err, data) => {
        if (err) throw err;
        console.log('!!!!!!!!')
        let newValue = data.replace('{INCLUDE_CSS}', '<script src="./style.css"></script>');
        console.log(newValue)
        fs.writeFile('index.html', newValue, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log('Done!');
        })
    })
 }

 function includeScript(filename) {
    fs.readFile('index.txt', 'utf-8', function(err, data) {
        if (err) throw err;
     
        var newValue = data.replace(/email/gim, 'name');
     
        fs.writeFile('index.txt', newValue, 'utf-8', function(err, data) {
            if (err) throw err;
            console.log('Done!');
        })
    })
}