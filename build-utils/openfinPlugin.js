const { launch } = require('hadouken-js-adapter');


let firstLaunch = true;

module.exports = class OpenFinPlugin {
    constructor({ manifestUrl }) {
        this.manifestUrl = manifestUrl;
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