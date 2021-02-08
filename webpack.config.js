const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }],
      }],
    },
    output: {
      path: `${__dirname}/dist`,
      filename: 'main.js',
    },
    externals: {
      fsevents: "require('fsevents')",
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  {
    mode: 'development',
    entry: './src/views/app.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    externals: {
      fsevents: "require('fsevents')",
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }],
    },
    output: {
      path: `${__dirname}/dist`,
      filename: 'app.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/views/index.html',
      }),
    ],
  },
];
