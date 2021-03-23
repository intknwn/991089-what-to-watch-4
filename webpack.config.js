const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
  resolve: {
    alias: {
      'react-dom$': `react-dom/profiling`,
      'scheduler/tracing': `scheduler/tracing-profiling`,
    }
  }
};
