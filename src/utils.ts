import { colors } from './colors'
import type { Color } from './definitions'

/**
 * Creates a string with specified spaces count
 * @param {number} spaceCount - space count
 * @return {string}
 */
export const indent = (spaceCount: number): string => repeat(' ', spaceCount)

/**
 * Gets longest string length
 * @param {Array<string>} strings
 * @return {number}
 */
export const maxLength = (strings: string[]): number =>
    strings.reduce((max, str) => Math.max(max, str.length), 0)

/**
 *
 * @param {string} input - single or multiline string
 * @param {string} indentation - indentation space as string
 * @return {string} - Indented multiline string
 */
export const alignString = (input: string, indentation: string): string =>
    `${indentation}${input}`.replace(/\n/g, `\n${indentation}`)

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
    if (input == null) return true
    if (typeof input === 'boolean' || typeof input === 'number' || input instanceof Date)
        return true
    if (typeof input === 'string') return isSingleLineString(input)
    return Array.isArray(input) && input.length === 0
}

/**
 *
 * @param {string} input
 * @return {boolean} - true if it's a string and it's single line
 */
export const isSingleLineString = (input: string): boolean => !input.includes('\n')
