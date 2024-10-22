const colorString = require('colors/safe')

/**
 * Creates a string with specified spaces count
 * @param {number} spaceCount - space count
 * @return {string}
 */
exports.indent = function indent(spaceCount) {
    return ' '.repeat(spaceCount)
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
    if (!color) return string
    let modifiedString = string
    if (modifiedString === null) modifiedString = 'null'
    if (modifiedString === undefined) modifiedString = 'undefined'
    return colorString[color](modifiedString)
}
