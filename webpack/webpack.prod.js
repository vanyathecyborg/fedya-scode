const path = require('path');
const commonConfig = require('./webpack.common.js');

const webpackMerge = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

const nodeModules = path.join(process.cwd(), 'node_modules');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
  },

  mode: 'production',

  optimization: {
    splitChunks: {
      maxAsyncRequests: 7,
      maxInitialRequests: 5,
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: 'react',
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash/,
          name: 'lodash',
        },
        toolkit: {
          test: /[\\/]node_modules[\\/]beeline-react-ui-toolkit/,
          name: 'toolkit',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -1,
        }
      }
    }
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new Visualizer(),

  ],
});
