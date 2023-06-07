const fs = require('fs')
const path = require('path')
const sass = require('sass')
const csso = require('csso')
const rollup = require('rollup')
const terser = require('@rollup/plugin-terser')
const nodeResolve = require('@rollup/plugin-node-resolve')
const handlebars = require('handlebars')

const encoding = 'utf-8'
const lang = 'en'

const themeData = {
    sidenav: {
        items: [
            {
                partial: 'basics',
                icon: 'fa-circle-user',
            },
            {
                partial: 'work',
                icon: 'fa-briefcase',
            },
            {
                partial: 'education',
                icon: 'fa-book',
            },
        ],
    },
}

const getTemplate = () => fs.readFileSync(__dirname + '/src/template/resume.hbs', encoding)

const registerPartial = () => {
    const partialsDir = path.join(__dirname, '/src/template/partials')
    const partialFilenames = fs.readdirSync(partialsDir)

    partialFilenames.forEach(filename => {
        const matches = /^([^.]+).hbs$/.exec(filename)

        if (!matches) {
            return
        }

        const name = matches[1]
        const partialTemplate = fs.readFileSync(path.join(partialsDir, filename), encoding)

        handlebars.registerPartial(name, partialTemplate)
    })
}

const registerTranslation = resume => {
    const i18nDir = path.join(__dirname, '/src/i18n')
    const i18nFilenames = fs.readdirSync(i18nDir)

    if (!resume.hasOwnProperty('meta')) {
        resume.meta = {}
    }

    if (!resume.meta.hasOwnProperty('lang') || resume.meta.lang.length === 0) {
        resume.meta.lang = lang
    }

    let i18nFile = fs.readFileSync(path.join(i18nDir, `${lang}.json`), encoding)

    if (resume.meta.lang !== lang) {
        const resumeLang = resume.meta.lang.toLowerCase()
        const matches = i18nFilenames.filter(filename => new RegExp(`^${resumeLang}.json$`).test(filename))

        if (matches.length > 0) {
            i18nFile = fs.readFileSync(path.join(i18nDir, matches.shift()), encoding)
        } else {
            throw new Error(`${resumeLang} is not supported.`)
        }
    }

    themeData.i18n = JSON.parse(i18nFile)
}

const minifyCss = () => {
    const css = sass.compile(__dirname + '/src/scss/styles.scss', {
        loadPaths: ['node_modules'],
    }).css

    return csso.minify(css).css
}

const minifyJs = async () => {
    const bundle = await rollup.rollup({
        input: __dirname + '/src/js/index.js',
        plugins: [nodeResolve(), terser()],
    })

    const result = await bundle.generate({
        format: 'es',
        compact: true,
    })

    return result.output[0].code
}

const render = async resume => {
    const template = getTemplate()
    registerPartial()
    registerTranslation(resume)

    return handlebars.compile(template)({
        resume: resume,
        data: themeData,
        css: minifyCss(),
        js: await minifyJs(),
    })
}

handlebars.registerHelper('default', (value, defaultValue) => value || defaultValue)

handlebars.registerHelper('toLowerCase', string => string.toLowerCase())

handlebars.registerHelper('capitalizeFirst', string => string.charAt(0).toUpperCase() + string.slice(1))

handlebars.registerHelper('formatDate', (string, lang) => {
    const date = new Date(Date.parse(string)).toLocaleString(lang + '-' + lang.toUpperCase(), {
        month: '2-digit',
        year: 'numeric',
    })

    if (date !== 'Invalid Date') {
        return date
    }
})

handlebars.registerHelper('sortByDate', (...arrays) => {
    const mergedArrays = []
        .concat(...arrays)
        .filter(item => item !== undefined)
        .slice(0, -1)

    return mergedArrays.sort((a, b) => {
        const dateA = new Date(Date.parse(a.startDate ?? a.date))
        const dateB = new Date(Date.parse(b.startDate ?? b.date))

        return dateB - dateA
    })
})

module.exports = {
    render,
}
