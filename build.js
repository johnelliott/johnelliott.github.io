const fs = require('fs')
const md = require('marked')

const posts = require('./posts.json')
const template = fs.readFileSync(`${__dirname}/template.html`, 'utf8')

const templatePromises = posts.map(post => {
  return new Promise(function (resolve, reject) {
    renderPost(post, resolve)
  })
})

Promise.all(templatePromises).then(function (posts) {
  // make single page
  fs.writeFileSync(`${__dirname}/index.html`, template.replace('{content}', posts.join('')))
})

function renderPost (post, callback) {
  const markdown = fs.readFileSync(`${__dirname}/posts/${post.markdown}`, 'utf8')
  md(markdown, (err, content) => {
    if (err) throw err
    // make single pages
    // fs.writeFileSync(`./${file.replace('.md', '.html')}`, template.replace('{content}', content))
    // add title as anchor link
    const html = `<h1><a href="#${post.title}">${post.title}</a></h1>${content}`
    // pass content along
    callback(html)
  })
}

// render a special resume page
const resume =  fs.readFileSync(`${__dirname}/resume.md`, 'utf8')
md(resume, (err, html) => {
  if (err) reject(err)
  fs.writeFileSync(`${__dirname}/resume.html`, template.replace('{content}', html))
})
