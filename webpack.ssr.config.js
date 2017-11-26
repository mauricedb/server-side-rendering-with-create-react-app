const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const config = require("react-scripts/config/webpack.config.prod");

config.entry = "./src/index.ssr.js";

config.output.filename = "static/ssr/[name].js";
config.output.libraryTarget = "commonjs2";
delete config.output.chunkFilename;

config.target = "node";
config.externals = /^[a-z\-0-9]+$/;
delete config.devtool;

config.plugins = config.plugins.filter(
  plugin =>
    !(
      plugin instanceof HtmlWebpackPlugin ||
      plugin instanceof ManifestPlugin ||
      plugin instanceof SWPrecacheWebpackPlugin
    )
);

module.exports = config;
