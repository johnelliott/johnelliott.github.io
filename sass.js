const sass = require('node-sass')

const file = `${__dirname}/style.scss`

// private method to build css synchronously
function build () {
  return sass.renderSync({
    file,
    outFile: process.env.NODE_ENV === 'development' ? `${__dirname}/style.css` : false,
    outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    sourceMap: process.env.NODE_ENV === 'development',
    sourceMapEmbed: process.env.NODE_ENV === 'development'
  })
}
function getCSSString () {
  return build.css.toString()
}

if (require.main === module) {
  const result = build()
  console.log(result.stats);
  console.log(result.css.toString());
  console.log(result.map);
}

module.exports = build
// TODO export new function returning css string
