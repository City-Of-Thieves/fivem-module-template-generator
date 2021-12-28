class LanguageHelper {
    static determineExtension(language) {
      if (language === 'lua') {
          return '.lua';
      }
      if (language === 'C#') {
          return '.cs';
      }
      return '.js';
  }
}

module.exports = LanguageHelper;