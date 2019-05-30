// const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // responsavel por extrair os css ja compilado

module.exports = {
    entry: './src/index.jsx', // entrada, primeiro arquivo a carregar e direcionar os demais
    output:{
        path: __dirname + '/public', //diretório de saida das build de css e js
        filename: './app.js' //nome do bundle a ser salvo na compilação
        // path: path.resolve(__dirname + '/public', './app.js'),
    },
    devServer:{
        port: 8080, //porta do servidor que sera rodado aplicação
        contentBase: './public', //Pasta de leitura do bundle e index.html
    },
    resolve:{
        extensions: ['.js', '.jsx'], //Extensões a serem interpretadas
        alias:{
            modules: __dirname + '/node_modules', //alias para facilitar a chamada de arquivos da pasta node_modules
            jquery: 'modules/jquery/dist/jquery.min.js',    // referencia a jquery para fucnionamento correto no projeto
            bootstrap: 'modules/bootstrap/dist/js/boostrap.js'  // referencia a bootsrap para fucnionamento correto no projeto
        }
    },
    plugins: [
        new webpack.ProvidePlugin({  //habilitar jquery disponível
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('app.css') // apontar para css a ser gerado na carga de build
    ],
    module:{
        rules:[{
            test: /.js[x]?$/,        // Teste para arquivos a serem interpretados
            loader: 'babel-loader',  
            exclude: /node_modules/, 
            query: {
                presets: ['es2015', 'react'],  
                plugins: ['transform-object-rest-spread']  // Utilização de spred na aplicacao
            }
        },{
            test: /\.css$/, // Teste para arquivos a serem interpretados
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },{
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/, // Teste para arquivos a serem interpretados
            loader: 'file'
        }]
    }
}