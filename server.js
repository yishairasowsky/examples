const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const path = require('path')
const fs = require('fs')

const appName = process.argv.length > 2 ? process.argv[2] : 'current-app-seed';

const isEarlytutorial = appName === '00_hello_world' || appName === '01_hello_openfin'

if (!fs.existsSync(path.join(__dirname, appName, 'openfin.config.json')) && !isEarlytutorial) {
    console.error('No config found at specified location');
    process.exit(1)
}


const port = 5555;
const config = require('./webpack.config')({ appName, port })



const compiler = Webpack(config);
const devServerOptions = Object.assign({}, config.devServer, {
    stats: {
        colors: true,
    },
});
const server = new WebpackDevServer(compiler, devServerOptions)


server.listen(port, () => {
    console.log('listening')
})