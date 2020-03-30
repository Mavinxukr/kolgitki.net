const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]_[local]',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });
      return config;
    },
  }),
);

module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), // workbox directory is present
    new WorkboxWebpackPlugin.GenerateSW({
      importWorkboxFrom: 'local',
    }),
    // new CleanWebpackPlugin() // workbox directory is missing
  ],
};
