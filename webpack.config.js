/* eslint-disable */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const tsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let config = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  optimization: {
    nodeEnv: false,
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    plugins: [new tsConfigPathsPlugin({})],
    extensions: ['.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
};

module.exports = (env, argv) => {
  const { mode } = argv;

  config.mode = mode;

  if (mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
};
