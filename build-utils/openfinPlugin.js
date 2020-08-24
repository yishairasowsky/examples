const { launch } = require('hadouken-js-adapter');

let firstLaunch = true;
module.exports = class OpenFinPlugin {
    constructor({ manifestUrl }) {
        this.cliArg = process.argv.find(arg => arg.includes('--platform-url'))
        this.arg = this.cliArg ? process.argv[2].split('=')[1] : '';
        this.manifestUrl = this.arg ? manifestUrl.replace('current-app-seed', this.arg) : manifestUrl;
    }
    apply(compiler) {
        compiler.hooks.done.tap('OpenFinPlugin', (compilation, callback) => {
            if (firstLaunch) {
                launch({ manifestUrl: this.manifestUrl });
                firstLaunch = false;
            }
        })
    }
}