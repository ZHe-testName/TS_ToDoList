module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  // stories: ['../story/**/*.stories.tsx'],
  addons: [
      '@storybook/preset-create-react-app',
      '@storybook/addon-actions',
      '@storybook/addon-links',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
          // include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false, 
          options: {parser: 'typescript'}},
        },
      },
    },
  ],
};
