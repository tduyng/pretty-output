#!/usr/bin/env node
import { exec } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { colors } from '../src/colors.js'

const execAsync = promisify(exec)

async function run() {
    try {
        await execAsync('rm -rf lib')
        await execAsync('npx tsc -p tsconfig.lib.json --module NodeNext --outDir lib/esm')
        await writeFile('lib/esm/package.json', '{"type": "module"}')

        await execAsync('npx tsc -p tsconfig.lib.json --module CommonJS --outDir lib/cjs')
        await writeFile('lib/cjs/package.json', '{"type": "commonjs"}')

        console.log(colors.green('Compilation successful'))
    } catch (error) {
        if (error instanceof Error) {
            console.error(colors.red('Compilation failed:'), error.message)
        } else {
            console.error(colors.red('Compilation failed:'), error)
        }
    }
}

run()
