const commonConfig = require('./webpack.common.js');

const webpackMerge = require('webpack-merge');
const { EnvironmentPlugin, SourceMapDevToolPlugin } = require('webpack');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    port: 3030,
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor/,
    }),
  ],
});
