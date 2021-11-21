const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV != 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //mostrar o erro de forma legivel no navegador
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //dizer qual a extensão dos arquivos
    resolve: {
        extensions: ['.js', '.jsx']
    },
    //configuração para poder editar e atualizar automaticamente
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
        compress: true,
        port: 9000,
    },
    //gera html automatico pasta dist
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    //são os carregadores de cada modulo
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}