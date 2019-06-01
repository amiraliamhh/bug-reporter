const fs = require('fs')
const { exec }  = require('child_process')
const rimraf = require('rimraf')

let manifest = require('../manifest.json')

function asyncReadDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                return reject(err)
            }

            return resolve(files)
        })
    })
}

rimraf.sync(('build'))

exec('parcel build public/*.html --out-dir build --no-source-maps', async (err, stdout, stderr) => {
    if (err) {
        return console.error(err)
    }
    if (stderr) {
        console.error(stderr)
    }

    console.log(stdout)

    const files = await asyncReadDir('build')
    
    const matchJs = /\.js$/
    const matchStyles = /\.css$/
    const jsArr = []
    const stylesArr = []

    for (const file of files) {
        if (matchJs.test(file)) {
            jsArr.push(file)
            continue
        }

        if (matchStyles.test(file)) {
            stylesArr.push(file)
            continue
        }
    }

    manifest.content_scripts[0].js = jsArr
    manifest.content_scripts[0].css = stylesArr

    fs.writeFile('build/manifest.json', JSON.stringify(manifest, null, 4), 'utf8', err => {
        if (err) {
            console.error(err)
        }
    })
})
