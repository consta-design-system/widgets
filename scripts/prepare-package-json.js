const fs = require('fs')

const omit = (obj, props) => {
  const newObj = { ...obj }
  props.forEach(prop => delete newObj[prop])

  return newObj
}

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
