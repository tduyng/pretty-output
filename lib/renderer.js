const utils = require('./utils')

/**
 * Get color of an input
 * @param {*} input
 * @param {colors} colors
 * @return {string|null} - color or null if no color
 */
exports.inputColor = (input, colors) => {
    if (!colors) return null

    const type = typeof input

    // Print strings in regular terminal color
    if (type === 'string') return colors.string

    if (input === true) return colors.true

    if (input === false) return colors.false

    if (input === null) return colors.null

    if (input === undefined) return colors.undefined

    if (type === 'number') return colors.number

    return null
}

exports.indent = (input, options) => `${options.indentation}${input}`

exports.renderSerializable = (input, options, indentation) => {
    if (Array.isArray(input)) return exports.renderEmptyArray(options, indentation)

    const color = exports.inputColor(input, options.colors)
    const inputResult = utils.colorString(input, color)

    return `${indentation}${inputResult}\n`
}

exports.renderMultilineString = (input, options, indentation) => {
    const color = exports.inputColor(input, options.colors)
    const indentedString = utils.alignString(input, exports.indent(indentation, options))
    const output = `${indentation}"""\n${indentedString}\n${indentation}"""\n`

    return utils.colorString(output, color)
}

exports.renderEmptyArray = (options, indentation) => `${indentation}(empty array)\n`

exports.renderObjectKey = (key, options, indentation) => {
    const colors = options.colors || {}
    const output = `${indentation}${key}: `

    return utils.colorString(output, colors.keys)
}

exports.renderDash = (options, indentation) => {
    const colors = options.colors || {}
    const output = `${indentation}- `

    return utils.colorString(output, colors.dash)
}

exports.renderMaxDepth = (options, indentation) => `${indentation}(max depth reached)\n`

exports.renderSerializableObjectValue = (key, value, valueColumn, options, indentation) => {
    if (value === undefined && options.hideUndefined) return undefined
    const renderedKey = exports.renderObjectKey(key, options, indentation)
    const alignSpaces = utils.repeat(' ', valueColumn - key.length)
    const renderedValue = exports.renderSerializable(value, options, alignSpaces)

    return `${renderedKey}${renderedValue}`
}

exports.renderMaxDepthObjectValue = (key, valueColumn, options, indentation) => {
    const renderedKey = exports.renderObjectKey(key, options, indentation)
    const alignSpaces = utils.repeat(' ', valueColumn - key.length)
    const renderedValue = exports.renderMaxDepth(options, alignSpaces)

    return `${renderedKey}${renderedValue}`
}

exports.renderSerializableArrayValue = (value, options, indentation) => {
    const renderedDash = exports.renderDash(options, indentation)
    const renderedValue = exports.renderSerializable(value, options, '')

    return `${renderedDash}${renderedValue}`
}

exports.renderMaxDepthArrayValue = (options, indentation) => {
    const renderedDash = exports.renderDash(options, indentation)
    const renderedValue = exports.renderMaxDepth(options, '')

    return `${renderedDash}${renderedValue}`
}

exports.renderErrorStack = (stack, options, indentation) => {
    const color = exports.inputColor(stack, options.colors)
    const indentedDash = exports.renderDash(options, indentation)
    const indentedStack = utils.alignString(stack, indentedDash)

    return utils.colorString(indentedStack, color)
}

exports.renderObjectErrorStack = (key, stack, options, indentation) => {
    const renderedKey = exports.renderObjectKey(key, options, indentation)
    const stackIndentation = exports.indent(indentation, options)
    const renderedStack = exports.renderErrorStack(stack, options, stackIndentation)
    return `${renderedKey}\n${renderedStack}\n`
}
