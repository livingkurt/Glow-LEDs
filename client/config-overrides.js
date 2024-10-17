const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { override, addBabelPlugin, addWebpackPlugin, addWebpackModuleRule } = require("customize-cra");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = override(
  addBabelPlugin(["@babel/plugin-proposal-private-property-in-object", { loose: true }]),
  addWebpackPlugin(new webpack.HotModuleReplacementPlugin()),

  // Add ESLint Webpack Plugin
  addWebpackPlugin(
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      eslintPath: require.resolve("eslint"),
      overrideConfigFile: ".eslintrc.json", // Use your custom ESLint config
      context: "src",
    })
  ),

  addWebpackModuleRule({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: require.resolve("babel-loader"),
      options: {
        presets: [require.resolve("@babel/preset-env"), require.resolve("@babel/preset-react")],
        babelrc: false, // Disable external .babelrc lookup
        configFile: false, // Don't search for config files
      },
    },
  }),

  (config, env) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      async_hooks: false,
      path: require.resolve("path-browserify"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      child_process: false,
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      net: require.resolve("net-browserify"),
      tls: require.resolve("tls-browserify"),
      zlib: require.resolve("browserify-zlib"),
    };

    config.module.rules.push({
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
      exclude: /node_modules/,
    });

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

    config = rewireReactHotLoader(config, env);

    config.stats = {
      warningsFilter: /source-map/,
    };

    return config;
  }
);
