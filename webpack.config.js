const path = require("path");

module.exports = {
  entry: "./server.js", // your main server file
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, path.resolve(__dirname, "client")], // added client folder to exclude
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
