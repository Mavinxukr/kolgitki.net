const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]_[local]',
    },
    webpack(config) {
      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups.shared.enforce = true;
      }
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
