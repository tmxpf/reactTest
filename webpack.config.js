const path = require('path');

module.exports = {
    name: 'word-chain-game',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client']
    },  // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }]
    },

    output: {
        path: path.join(__dirname, 'dist')
    } // 출력
};