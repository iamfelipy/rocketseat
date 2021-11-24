const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV != 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //mostrar o erro de forma legivel no navegador
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //dizer qual a extensão dos arquivos
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    //configuração para poder editar e atualizar automaticamente
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
        compress: true,
        port: 9000,
        hot: true,
    },
    //gera html automatico pasta dist
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    //são os carregadores de cada modulo
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}