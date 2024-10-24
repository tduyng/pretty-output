import { colors } from './colors.js'
import type { Color } from './definitions.js'

const cache = new Map<number, string>()
const CLEANUP_THRESHOLD = 1000
let cacheInsertCount = 0
const cleanupCache = () => {
    cache.clear()
}

/**
 * Creates a string with specified spaces count
 * @param {number} spaceCount - space count
 * @return {string}
 */
export const indent = (spaceCount: number): string => {
    if (!cache.has(spaceCount)) {
        cache.set(spaceCount, ' '.repeat(spaceCount))
        cacheInsertCount++

        if (cacheInsertCount >= CLEANUP_THRESHOLD) {
            cacheInsertCount = 0
            cleanupCache()
        }
    }
    return cache.get(spaceCount) as string
}

/**
 * Gets longest string length
 * @param {Array<string>} strings
 * @return {number}
 */
export const maxLength = (strings: string[]): number => {
    let max = 0
    for (const str of strings) {
        if (str?.length > max) max = str.length
    }
    return max
}

/**
 *
 * @param {string} input - single or multiline string
 * @param {string} indentation - indentation space as string
 * @return {string} - Indented multiline string
 */
export const alignString = (input: string, indentation: string): string =>
    input
        .split('\n')
        .map((line) => `${indentation}${line}`)
        .join('\n')

/**
 *
 * @param {string} input
 * @param {string} color name
 * @return {string} - colored string (for terminal output)
 */
export const colorString = (input: string, color?: Color): string =>
    color ? `${colors[color](input)}` : input

export const repeat = (string: string, count: number) => string.repeat(Math.max(0, count))

/**
 * Serializable values are boolean, number, null, Date, Single line strings, empty arrays
 * @param {*} input
 * @return {boolean}
 */
export const isSerializable = (input: unknown): boolean => {
    if (input === null || input === undefined) return true
    if (typeof input === 'boolean' || typeof input === 'number' || input instanceof Date)
        return true
    if (typeof input === 'string' && !input.includes('\n')) return true
    return Array.isArray(input) && input.length === 0
}
