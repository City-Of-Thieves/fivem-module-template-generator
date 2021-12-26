const fs = require('fs');
const path = require('path');

// TODO: give this a more descriptive name
const dataForHTML = (fileChoice) => {
    modifyHTML(fileChoice);
    
    if (fileChoice.includes('html')) {
        return fs.readFileSync(path.join(__dirname, '../templates/html/index.html'))
    }
}

// TODO: Unused param
const dataforLua = (fileChoice) => {
    return fs.readFileSync(path.join(__dirname, '../templates/fxmanifest.lua'))
}

// TODO: Unused param
const dataforGitIgnore = (fileChoice) => {
    return fs.readFileSync(path.join(__dirname, '../templates/.gitignore'))
}


// TODO: This should always be on the last line of the file
module.exports = {dataForHTML , dataforLua , dataforGitIgnore};


// TODO: give this a more descriptive name
const modifyHTML = (fileChoice) => {
    if (fileChoice.includes('html' && 'css')) {
        console.log('css')
        includeCSS()
    }

    if (fileChoice.includes('html' && 'css' && 'script')) {
        includeCSS();
        // TODO: This is not working
        //includeScript();
    }
} 


function includeCSS() {
    fs.readFileSync(path.join(__dirname, '../templates/html/index.html'), (err, data) => {
        if (err) throw err;

        let newValue = data.replace('{INCLUDE_CSS}', '<script src="./style.css"></script>');
        console.log(newValue)
        fs.writeFile('index.html', newValue, 'utf-8', (err, data) => {
            if (err) throw err;
        })
    })
 }

// TODO: Finish me
//  function includeScript(filename) {
//     fs.readFile('index.txt', 'utf-8', function(err, data) {
//         if (err) throw err;
     
//         var newValue = data.replace(/email/gim, 'name');
     
//         fs.writeFile('index.txt', newValue, 'utf-8', function(err, data) {
//             if (err) throw err;
//             console.log('Done!');
//         })
//     })
//}