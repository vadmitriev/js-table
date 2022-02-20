const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: "./index.ts",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      api: path.resolve(__dirname, "src/api"),
      store: path.resolve(__dirname, "src/store"),
      utils: path.resolve(__dirname, "src/utils"),
      components: path.resolve(__dirname, "src/components"),
      constants: path.resolve(__dirname, "src/constants"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
