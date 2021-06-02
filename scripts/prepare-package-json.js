const fs = require('fs')
const { omit } = require('src/__private__/utils/util')

const packageJson = JSON.parse(fs.readFileSync('package.json'))

const libPackageJson = omit(packageJson, [
  'scripts',
  'browserslist',
  'husky',
  'lint-staged',
  'devDependencies',
  'engines',
])

fs.writeFileSync('lib/package.json', JSON.stringify(libPackageJson, null, 2))
