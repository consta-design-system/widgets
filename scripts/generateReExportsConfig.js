module.exports = {
  src: './src',
  distPath: './dist',
  reexports: ['/components'],
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
    'src/components/Grid/*',
    'src/components/CoreBarChart/*',
    'src/components/CoreDonutChart/*',
  ],
};
