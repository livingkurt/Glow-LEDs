const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { override, addBabelPlugin } = require("customize-cra");

module.exports = override(
  addBabelPlugin(["@babel/plugin-proposal-private-property-in-object", { "loose": true }]),
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
      "react/jsx-runtime": require.resolve("react/jsx-runtime.js"),
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
      setupMiddlewares: (middlewares, devServer) => {
        return middlewares;
      },
    };

    // Existing logic for Hot Loader
    config = rewireReactHotLoader(config, env);

    // Suppress specific warnings
    config.stats = {
      warningsFilter: /source-map/,
    };

    return config;
  }
);

// const rewireReactHotLoader = require("react-app-rewire-hot-loader");
// const { override, addBabelPlugin } = require("customize-cra");

// module.exports = function override(config, env) {
//   addBabelPlugin("@babel/plugin-proposal-private-property-in-object"),
//     (config, env) => {
//       // Add polyfills
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         "fs": false,
//         "path": require.resolve("path-browserify"),
//         "https": require.resolve("https-browserify"),
//         "url": require.resolve("url/"),
//         "child_process": false,
//         "os": require.resolve("os-browserify/browser"),
//         "stream": require.resolve("stream-browserify"),
//         "crypto": require.resolve("crypto-browserify"),
//         "http": require.resolve("stream-http"),
//         "net": require.resolve("net-browserify"),
//         "tls": require.resolve("tls-browserify"),
//         "zlib": require.resolve("browserify-zlib"), // Add this line
//         "react/jsx-runtime": require.resolve("react/jsx-runtime.js"),
//       };

//       config.devServer = {
//         ...config.devServer,
//         setupMiddlewares: (middlewares, devServer) => {
//           // Your custom logic here
//           return middlewares;
//         },
//       };
//       config = rewireReactHotLoader(config, env);
//       return config;
//     };

//   return config;
// };
