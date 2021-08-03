const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: mode,

  output: {
    assetModuleFilename: "images/[hash][ext][query]",
  },

  devtool: false, // use "source-map" for our pre transpiled code to be available in the browser

  devServer: {
    contentBase: "./dist",
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css/,
        use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } }, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebPackPlugin({
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
};
