const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const articles = [
  "about-us",
  "checkout",
  "product-detail-layout-01",
  "contact-us",
  "terms-conditions",
  "wishlist",
];

let multiplesFiles = articles.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + ".html",
    template: __dirname + `/src/${entryName}.html`,
  });
});
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/about.html",
    // }),
  ].concat(multiplesFiles),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
