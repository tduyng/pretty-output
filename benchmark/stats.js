const _ = require('lodash')

// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
const fixedInt = (exports.fixedInt = (v) => Math.floor(v))

/**
 *
 * @param {number} time - in nano seconds
 */
exports.prettyTime = (time) => {
    const mn = fixedInt(time / 1e12)
    const s = fixedInt(time / 1e9) - fixedInt(mn * 1e3)
    const ms = fixedInt(time / 1e6) - fixedInt(mn * 1e6) - fixedInt(s * 1e3)
    const micros =
        fixedInt(time / 1e3) - fixedInt(mn * 1e9) - fixedInt(s * 1e6) - fixedInt(ms * 1e3)
    const ns =
        fixedInt(time) -
        fixedInt(mn * 1e12) -
        fixedInt(s * 1e9) -
        fixedInt(ms * 1e6) -
        fixedInt(micros * 1e3)

    let result = ''
    if (mn !== 0) result += ` ${mn} mn`
    if (s !== 0) result += ` ${s} s`
    if (ms !== 0) result += ` ${ms} ms`
    if (micros !== 0) result += ` ${micros} µs`
    if (ns !== 0) result += ` ${ns} ns`

    return result
}

exports.stats = (diffs) => {
    let min = diffs[0]
    let max = diffs[0]
    let total = 0

    _.forEach(diffs, (diff) => {
        min = Math.min(min, diff)
        max = Math.max(max, diff)
        total += diff
    })

    const mean = total / diffs.length
    return { min, max, mean, total }
}

exports.prettyStats = (stats) => {
    const result = {}
    result.min = exports.prettyTime(stats.min)
    result.max = exports.prettyTime(stats.max)
    result.mean = exports.prettyTime(stats.mean)
    result.total = exports.prettyTime(stats.total)

    return result
}
