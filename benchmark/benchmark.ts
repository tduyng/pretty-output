import util from 'node:util'
import columnify from 'columnify'
import prettyjson from 'prettyjson'

import { makeElement } from './fixture.js'
import prettyoutput from '../src/index.js'
import { stats, prettyStats } from './stats.js'

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
        prettyoutput(element, { noColor: true, maxDepth: 100 })
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

    const prettyOutputStats = stats(prettyOutputDiffs)
    const prettyJsonStats = stats(prettyJsonDiffs)
    const utilInspectStats = stats(utilInspectDiffs)

    const result = [
        { name: 'pretty-output', ...prettyStats(prettyOutputStats) },
        { name: 'prettyjson', ...prettyStats(prettyJsonStats) },
        { name: 'util.inspect', ...prettyStats(utilInspectStats) },
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
        loops: 100,
        levels: 5,
        keys: 20,
        weights: { serializable: 0.9, array: 0.3, object: 0.5, multilineString: 0.3, error: 0.2 },
    },
]

for (const test of tests) {
    makeBench(test.weights, test.levels, test.keys, test.loops)
}
