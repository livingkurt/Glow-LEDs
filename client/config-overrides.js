const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { override, addBabelPlugin } = require("customize-cra");

module.exports = override(addBabelPlugin("@babel/plugin-proposal-private-property-in-object"), (config, env) => {
  // This is your existing logic
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
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

  config.devServer = {
    ...config.devServer,
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares;
    },
  };

  config = rewireReactHotLoader(config, env);

  return config;
});

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
