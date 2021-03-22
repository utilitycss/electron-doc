const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.config.common");

const config = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "./",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist"],
    }),
    new HTMLWebpackPlugin({
      title: "UtilityCSS Electron documentation.",
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html", // output file,
      inject: "body",
      inlineSource: ".(js)$",
      chunks: ["main"],
      minify: {
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackInlineSourcePlugin(HTMLWebpackPlugin),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: false,
});

module.exports = config;
