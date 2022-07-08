//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./Lib4Math.ts",
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "lib4math.js", // <--- Will be compiled to this single file
    library: 'sc',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};