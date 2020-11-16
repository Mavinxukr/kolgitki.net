const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const StyleLintPlugin = require('stylelint-webpack-plugin');
//
// module.exports = withCSS(
//   withSass({
//     cssModules: true,
//     cssLoaderOptions: {
//       importLoaders: 1,
//       localIdentName: '[name]_[local]',
//     },
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 1000000,
//           },
//         },
//       });
//
//       return config;
//     },
//   }),
// );
module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]_[local]',
    },
    webpack: (config) => {
      config.module.rules.push(
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node-modules/,
          enforce: 'pre',
          options: {
            emitWarning: true,
          },
        },
        {
          test: /\.(config)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.(png|ttf|eot|wtf|jpg|svg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {},
            },
          ],
        },
      );

      config.plugins.push(
        new StyleLintPlugin({
          emitErrors: false,
          quiet: false,
        }),
      );

      return config;
    },
  }),
);
