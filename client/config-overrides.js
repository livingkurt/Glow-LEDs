const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { override, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");

module.exports = override(addWebpackPlugin(new webpack.HotModuleReplacementPlugin()), (config, env) => {
  // This is your existing logic
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "async_hooks": false, // Add this line
    "path": require.resolve("path-browserify"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/"),
    "child_process": false,
    "os": require.resolve("os-browserify/browser"),
    "stream": require.resolve("stream-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "http": require.resolve("stream-http"),
    "net": require.resolve("net-browserify"),
    "tls": require.resolve("tls-browserify"),
    "zlib": require.resolve("browserify-zlib"), // Add this line
  };

  // Exclude node_modules from source-map-loader
  config.module.rules.push({
    test: /\.js$/,
    enforce: "pre",
    use: ["source-map-loader"],
    exclude: /node_modules/,
  });

  // Existing logic for devServer
  config.devServer = {
    ...config.devServer,
    hot: true,
    watchFiles: ["src/**/*"],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
  // Existing logic for Hot Loader
  config = rewireReactHotLoader(config, env);

  // Suppress specific warnings
  config.stats = {
    warningsFilter: /source-map/,
  };

  return config;
});
