const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getDirectoriesWithConfig, getDirectoriesWithEntry } = require('./build-utils/findDirectoriesWithConfig');
const OpenFinPlugin = require('./build-utils/openfinPlugin');



module.exports = (env, argv) => {
    const { appName, port } = env;

    function copyPluginConfig(dir) {
        return {
            from: path.resolve(__dirname, dir, 'openfin.config.json'),
            to: path.resolve(__dirname, dir, 'app.json'),
            transform(content, path) {
                return content
                    .toString()
                    .split('${OF_VER}')
                    .join('canary')
                    .split('${BASE_URL}')
                    .join('http://localhost:' + port)
            }
        }
    }

    const entries = getDirectoriesWithEntry();
    const entry = entries.reduce((carry, dir) => {
        return { ...carry, [dir]: path.join(__dirname, dir, 'src', 'main.ts') }
    }, {})

    return {
        mode: 'development',
        entry,
        output: {
            path: __dirname,
            filename: '[name]/bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.[t|j]sx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: getDirectoriesWithConfig().map(copyPluginConfig)
            }),
            appName ? new OpenFinPlugin({ manifestUrl: 'http://localhost:' + port + '/' + appName + '/app.json' }) : undefined
        ],
        devServer: {
            port,
            publicPath: '/'
        }
    }
}