const path = require('path');
const fs = require('fs');

module.exports = function b2bThemeLoader(source) {
  this.cacheable();
  const pathToTheme = path.resolve(this.context, 'themes', 'b2b.pcss');

  try {
    const additionalSource = fs.readFileSync(pathToTheme, 'utf8');
    this.addDependency(pathToTheme);
    return additionalSource.startsWith('/* reset */') ? additionalSource : source + additionalSource;
  } catch (e) {
    return new Error('To theme for component');
  }
  return source;
};
