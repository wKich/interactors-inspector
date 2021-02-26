/** @type {import("webpack").Configuration } */
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { path: `${__dirname}/build` },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
  performance: false,
};
