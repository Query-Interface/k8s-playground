const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  let mapType = false;

  const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'src/index.html'});

  return {
    target: 'web',
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        htmlWebpackPlugin,
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "src/env.js"}, 
              { from: "src/icons", to: "icons"},
              { from: "src/lib", to: "lib"},
          ]
        }),
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
   optimization: {
    runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "reactVendor"
          }

        },
      },
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8090",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Max-Age": "3600"
      },
      port: 11080,
      hot: true,
      overlay: true
    }
  };
};