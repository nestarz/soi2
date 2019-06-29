/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = {
  siteName: 'Elias Rhouzlane',
  siteUrl: 'https://eliasrhouzlane.com',
  titleTemplate: '%s | Elias Rhouzlane',
  icon: 'src/favicon.png',
  author: {
    firstName: 'Elias',
    lastName: 'Rhouzlane',
  },
  chainWebpack: (config) => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap((options) => {
        options.plugins.push(...[
          require('@fullhuman/postcss-purgecss')({
            content: [
              'src/assets/**/*.css',
              'src/**/*.vue',
              'src/**/*.js',
            ],
          }),
        ]);

        return options;
      });

    return 1;
  },
};
