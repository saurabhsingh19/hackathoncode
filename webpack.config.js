module.exports = {
    entry: './app/main.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 8000,
        host: '0.0.0.0'
    }
};
