import type { Color, InputColor, RenderOptions } from './definitions.js'
import { alignString, colorString, repeat } from './utils.js'

/**
 * Get color of an input
 * @param {*} input
 * @param {InputColor} color
 * @return {string|undefined} - color or undefined if no color
 */
export const getColor = (input: unknown, color?: InputColor): Color | undefined => {
    if (!color) return undefined

    switch (typeof input) {
        case 'string':
            return color.string
        case 'boolean':
            return input ? color.true : color.false
        case 'number':
            return color.number
        case 'object':
            return input === null ? color.null : undefined
        case 'undefined':
            return color.undefined
        default:
            return undefined
    }
}

export const indentString = (input: string, options: RenderOptions) =>
    `${options.indentation}${input}`

/**
 * Handling serialization of different input types.
 */
export const renderSerializable = (
    input: unknown,
    options: RenderOptions,
    indentation: string
): string => {
    if (Array.isArray(input)) return `${indentation}(empty array)\n`

    const color = getColor(input, options.colors)
    return `${indentation}${colorString(String(input), color)}\n`
}

export const renderMultilineString = (
    input: string,
    options: RenderOptions,
    indentation: string
): string => {
    const color = getColor(input, options.colors)
    const indentedString = alignString(input, indentString(indentation, options))
    const output = `${indentation}"""\n${indentedString}\n${indentation}"""\n`
    return colorString(output, color)
}

export const renderDash = (options: RenderOptions, indentation: string): string =>
    colorString(`${indentation}- `, options.colors?.dash)

export const renderMaxDepth = (indentation: string): string => `${indentation}(max depth reached)\n`

export const renderObjectKey = (key: string, options: RenderOptions, indentation: string): string =>
    colorString(`${indentation}${key}: `, options.colors?.keys)

/**
 * Renders the value in a key-value pair for serializable objects.
 */
export const renderSerializableObjectValue = (
    key: string,
    value: unknown,
    valueColumn: number,
    options: RenderOptions,
    indentation: string
): string | undefined => {
    if (value === undefined && options.hideUndefined) return undefined
    const alignSpaces = repeat(' ', valueColumn - key.length)
    return `${renderObjectKey(key, options, indentation)}${renderSerializable(value, options, alignSpaces)}`
}

/**
 * Handles rendering when max depth is reached for objects.
 */
export const renderMaxDepthObjectValue = (
    key: string,
    valueColumn: number,
    options: RenderOptions,
    indentation: string
): string => {
    const alignSpaces = repeat(' ', valueColumn - key.length)
    return `${renderObjectKey(key, options, indentation)}${renderMaxDepth(alignSpaces)}`
}

export const renderSerializableArrayValue = (
    value: string,
    options: RenderOptions,
    indentation: string
): string => `${renderDash(options, indentation)}${renderSerializable(value, options, '')}`

/**
 * Handles rendering when max depth is reached for arrays.
 */
export const renderMaxDepthArrayValue = (options: RenderOptions, indentation: string): string =>
    `${renderDash(options, indentation)}${renderMaxDepth('')}`

/**
 * Renders error stack trace.
 */
export const renderErrorStack = (
    stack: string,
    options: RenderOptions,
    indentation: string
): string => {
    const color = getColor(stack, options.colors)
    const indentedStack = alignString(stack, renderDash(options, indentation))

    return colorString(indentedStack, color)
}

/**
 * Renders object key and stack trace for error objects.
 */
export const renderObjectErrorStack = (
    key: string,
    stack: string,
    options: RenderOptions,
    indentation: string
): string => {
    const renderedKey = renderObjectKey(key, options, indentation)
    const stackIndentation = indentString(indentation, options)
    const renderedStack = renderErrorStack(stack, options, stackIndentation)
    return `${renderedKey}\n${renderedStack}\n`
}
