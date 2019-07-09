var chalk = require('chalk')
var semver = require('semver')
var packageConfig  = require('../package.json')
var shell = require('shelljs')
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    },
]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function() {
    var warning = []
    for (var i = 0; i < versionRequirements.length; i++) {
        var mod = versionRequirements[i]
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warning.push(mod.name + ':' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }
    if (warning.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        for (var i = 0; i < warning.length; i++) {
            var warning = warning[i]
            console.log(' ' + warning)
        }
        console.log()
        process.exit(1)
    }
}