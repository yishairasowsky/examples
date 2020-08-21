const { getDirectoriesWithConfig, getDirectoriesWithEntry } = require('./build-utils/findDirectoriesWithConfig');
const fs = require('fs');
const assert = require('assert');
const path = require('path');

const shouldHaveReadme = [...getDirectoriesWithConfig(), ...getDirectoriesWithEntry()];

assert(shouldHaveReadme.every(dir => {
    return fs.existsSync(path.join(__dirname, dir, 'README.md'))
}), 'Missing readme');