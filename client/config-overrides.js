const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  // Add polyfills
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

  config = rewireReactHotLoader(config, env);

  return config;
};
