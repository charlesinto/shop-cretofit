const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
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
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
    },
  });
});

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      // new HtmlWebpackPlugin({
      //   template: "./src/about.html",
      //   minify: {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
      // }),
    ].concat(multiplesFiles),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
