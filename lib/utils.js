const colorString = require('colors/safe')

/**
 * Creates a string with specified spaces count
 * @param {number} spaceCount - space count
 * @return {string}
 */
exports.indent = function indent(spaceCount) {
    return exports.repeat(' ', spaceCount)
}

/**
 * Gets longest string length
 * @param {Array<string>} strings
 * @return {number}
 */
exports.maxLength = (strings) => {
    let maxLength = 0
    for (const string of strings) {
        const length = string.length
        if (length > maxLength) maxLength = length
    }

    return maxLength
}

/**
 *
 * @param {string} string - single or multiline string
 * @param {string} indentation - indentation space as string
 * @return {string} - Indented multiline string
 */
exports.alignString = (string, indentation) => {
    const pattern = /\n/g
    return `${indentation}${string}`.replace(pattern, `\n${indentation}`)
}

/**
 *
 * @param {string} string
 * @param {string} color name
 * @return {string} - colored string (for terminal output)
 */
exports.colorString = (string, color) => {
    return !color ? string : colorString[color](`${string}`)
}

exports.repeat = (string, count) => {
    return string.repeat(Math.max(0, count))
}

/**
 * Serializable values are boolean, number, null, Date, Single line strings, empty arrays
 * @param {*} input
 * @return {boolean}
 */
exports.isSerializable = (input) => {
    const type = typeof input
    return (
        type === 'boolean' ||
        type === 'number' ||
        input === null ||
        input instanceof Date ||
        input === undefined ||
        exports.isSingleLineString(input) ||
        exports.isEmptyArray(input)
    )
}

/**
 *
 * @param {*} data
 * @return {boolean} - true if it's a string and it's single line
 */
exports.isSingleLineString = (data) => typeof data === 'string' && data.indexOf('\n') === -1

/**
 *
 * @param {*} input
 * @return {boolean}
 */
exports.isEmptyArray = (input) => Array.isArray(input) && input.length <= 0
