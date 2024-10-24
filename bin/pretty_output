#!/usr/bin/env node
import fs from 'node:fs'
import { Command } from 'commander'
import { prettyoutput } from '../lib/esm/index.js'
import { colors } from '../lib/esm/colors.js'

const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)))

const program = new Command()

program
    .usage('[options] <file ...>')
    .version(version)
    .option('-i, --indent <indent>', 'Space per indent', Number.parseInt)
    .option('-n, --noColor', 'Disable color')
    .option('-d, --depth <depth>', 'Max depth inspection', Number.parseInt)
    .option('--debug', 'debug mode')
    .parse(process.argv)

const options = {
    indentationLength: program.indent,
    noColor: program.noColor,
    maxDepth: program.depth,
}

const renderInput = (data) => {
    let input = data
    try {
        input = JSON.parse(data)
    } catch (e) {
        if (program.debug) console.error(`${colors.red('Error:')} unparsable content`)
    }

    console.log(prettyoutput(input, options))
}

if (program.args.length) {
    // First parameter is the file to read and parse
    const filename = program.args[0]
    try {
        renderInput(fs.readFileSync(filename, 'utf8'))
    } catch (e) {
        console.error(`${colors.red('Error:')} File ${filename} does not exist"`)
        process.exit(1)
    }
} else {
    // Read input stream

    let streamData = ''

    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => {
        if (chunk === '\n') {
            renderInput(streamData)
            streamData = ''
            return
        }
        streamData += chunk
    })
    process.stdin.on('end', () => {
        renderInput(streamData)
    })
}
