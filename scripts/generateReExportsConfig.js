module.exports = {
  src: './src',
  distPath: './dist',
  reexports: ['/components', '/hooks'],
  ignore: [
    'src/**/*.stories/**',
    'src/**/*.stories.*',
    'src/**/__tests__/**',
    'src/**/__stories__/**',
    'src/**/__stand__/**',
    'src/**/__mocks__/**',
    'src/**/__mock__/**',
    'src/components/TooltipContentForMultipleValues/*',
    'src/components/Title/*',
    'src/components/LegendItem/*',
    'src/components/Grid/*',
  ],
};
