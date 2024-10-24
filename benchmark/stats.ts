export const fixedInt = (v: number): number => Math.floor(v)

/**
 *
 * @param {number} time - in nano seconds
 */
export const prettyTime = (time: number): string => {
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

type Stats = {
    min: number
    max: number
    mean: number
    total: number
}

type PrettyStats = {
    min: string
    max: string
    mean: string
    total: string
}

export const stats = (diffs: number[]): Stats => {
    let min = diffs[0] ?? 0
    let max = diffs[0] ?? 0
    let total = 0

    for (const diff of diffs) {
        min = Math.min(min, diff)
        max = Math.max(max, diff)
        total += diff
    }

    const mean = total / diffs.length
    return { min, max, mean, total }
}

export const prettyStats = (stats: Stats): PrettyStats => {
    return {
        min: prettyTime(stats.min),
        max: prettyTime(stats.max),
        mean: prettyTime(stats.mean),
        total: prettyTime(stats.total),
    }
}
