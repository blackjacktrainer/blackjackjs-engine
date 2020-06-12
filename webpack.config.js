const path = require('path');
const merge = require('webpack-merge');

const common = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

function resolutions(target) {
  return {
    alias: {
      storage: path.resolve(__dirname, 'src', target, 'storage.js'),
      renderer: path.resolve(__dirname, 'src', target, 'renderer.js'),
      'player-input': path.resolve(__dirname, 'src', target, 'player-input.js'),
    },
  };
}

const serverConfig = merge(common, {
  target: 'node',
  output: {
    filename: 'main.node.js',
  },
  resolve: resolutions('node'),
});

const clientConfig = merge(common, {
  output: {
    filename: 'main.js',
  },
  resolve: resolutions('browser'),
  devServer: {
    contentBase: './dist',
  },
});

module.exports = [serverConfig, clientConfig];
