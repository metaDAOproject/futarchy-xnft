const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
//const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@solana/web3.js'],
      },
    },
    argv
  );

  // Add the fallback modules here
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
  };

  return config;
};