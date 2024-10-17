const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { override, addBabelPlugin, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");
const path = require("path");

module.exports = override(
  addBabelPlugin(["@babel/plugin-proposal-private-property-in-object", { "loose": true }]),
  addWebpackPlugin(new webpack.HotModuleReplacementPlugin()),
  (config, env) => {
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

    const eslintRule = config.module.rules.find(
      rule => rule.use && rule.use.some(use => use.loader && use.loader.includes("eslint-loader"))
    );

    if (eslintRule) {
      eslintRule.use.forEach(use => {
        if (use.loader && use.loader.includes("eslint-loader")) {
          use.options.useEslintrc = true;
          use.options.ignore = true;
          use.options.configFile = path.resolve(__dirname, "../.eslintrc.json");
        }
      });
    }

    return config;
  }
);
