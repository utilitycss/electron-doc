const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.config.common");

const config = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    hot: true,
    port: process.env.PORT || 9000,
    host: process.env.HOST || "localhost",
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "UtilityCSS Electron documentation.",
      template: path.join(__dirname, "src/index.dev.html"),
      filename: "index.html", // output file,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
});

module.exports = config;
