import util from 'node:util'
import { dump } from '@poppinss/dumper/console'
import columnify from 'columnify'
import prettyjson from 'prettyjson'

import { prettyOutput } from '../src/index.js'
import { makeElement } from './fixture.js'
import { prettyStats, stats } from './stats.js'

type Weights = Record<string, number>

interface BenchDesc {
    levels: number
    keys: number
    loops: number
    weights: string
}

function runFunction(loopCount: number, fn: () => void): number[] {
    const diffs: number[] = []

    for (let i = 0; i < loopCount; i++) {
        const time = process.hrtime()
        fn()
        const rawDiff = process.hrtime(time)
        const diff = rawDiff[0] * 1e9 + rawDiff[1]
        diffs.push(diff)
    }

    return diffs
}

function runPrettyOutput(element: unknown, loopCount: number): number[] {
    return runFunction(loopCount, () => {
        prettyOutput(element, { noColor: true, maxDepth: 100 })
    })
}

function runUtilInspect(element: unknown, loopCount: number): number[] {
    return runFunction(loopCount, () => {
        util.inspect(element, { depth: 100 })
    })
}

function runPrettyJson(element: unknown, loopCount: number): number[] {
    return runFunction(loopCount, () => {
        prettyjson.render(element, { noColor: true })
    })
}

function runDumper(element: unknown, loopCount: number): number[] {
    return runFunction(loopCount, () => {
        dump(element, { depth: 100 })
    })
}

function prettyWeights(weights: Weights): string {
    return Object.entries(weights)
        .map(([key, value]) => `${key}: ${value}`)
        .join('    ')
}

function makeBench(weights: Weights, levels: number, keysCount: number, loopCount: number): void {
    console.log('\n')

    const benchDesc: BenchDesc = {
        levels,
        keys: keysCount,
        loops: loopCount,
        weights: prettyWeights(weights),
    }
    console.log(columnify([benchDesc], { columnSplitter: ' | ' }), '\n')

    const element = makeElement(weights, levels, keysCount)

    const prettyOutputDiffs = runPrettyOutput(element, loopCount)
    const prettyJsonDiffs = runPrettyJson(element, loopCount)
    const utilInspectDiffs = runUtilInspect(element, loopCount)
    const dumperDiffs = runDumper(element, loopCount)

    const prettyOutputStats = stats(prettyOutputDiffs)
    const prettyJsonStats = stats(prettyJsonDiffs)
    const utilInspectStats = stats(utilInspectDiffs)
    const dumperStats = stats(dumperDiffs)

    const result = [
        { name: 'pretty-output', ...prettyStats(prettyOutputStats) },
        { name: 'prettyjson', ...prettyStats(prettyJsonStats) },
        { name: 'util.inspect', ...prettyStats(utilInspectStats) },
        { name: '@poppinss/dumper', ...prettyStats(dumperStats) },
    ]

    console.log(columnify(result, { columnSplitter: ' | ' }))
    console.log(
        '--------------------------------------------------------------------------------------------------------------'
    )
}

const tests = [
    {
        loops: 100,
        levels: 3,
        keys: 20,
        weights: { serializable: 0.9, array: 0.3, object: 0.5, multilineString: 0.3, error: 0.2 },
    },
    {
        loops: 100,
        levels: 4,
        keys: 20,
        weights: { serializable: 0.9, array: 0.3, object: 0.5, multilineString: 0.3, error: 0.2 },
    },
    {
        loops: 200,
        levels: 4,
        keys: 40,
        weights: { serializable: 0.9, array: 0.3, object: 0.5, multilineString: 0.3, error: 0.2 },
    },
    {
        loops: 100,
        levels: 5,
        keys: 20,
        weights: { serializable: 0.9, array: 0.3, object: 0.5, multilineString: 0.3, error: 0.2 },
    },
]

for (const test of tests) {
    makeBench(test.weights, test.levels, test.keys, test.loops)
}
