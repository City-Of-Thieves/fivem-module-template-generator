class LanguageHelper {
  static determineExtension(language) {
    let extension = '';

    switch (language) {
      case 'javascript':
        extension = '.js'
        break;
      case 'lua':
        extension = '.lua'
        break;
      case 'C#':
        extension = '.c'
        break;
    
      default: '.js'
        break;
    }
    return extension;
  }
}

module.exports = LanguageHelper;