import type { Color, InputColor, RenderOptions } from './definitions'
import { alignString, colorString, indent, repeat } from './utils'

/**
 * Get color of an input
 * @param {*} input
 * @param {InputColor} color
 * @return {string|undefined} - color or undefined if no color
 */
export const getColor = (input: unknown, color?: InputColor): Color | undefined => {
    if (!color) return undefined

    const colorMap: Record<string, Color | undefined> = {
        string: color.string,
        boolean: input ? color.true : color.false,
        number: color.number,
        null: color.null,
        undefined: color.undefined,
    }

    return colorMap[typeof input] || undefined
}

export const indentString = (input: string, options: RenderOptions) =>
    `${options.indentation}${input}`

export const renderSerializable = (
    input: string,
    options: RenderOptions,
    indentation: string
): string => {
    if (Array.isArray(input)) return `${indentation}(empty array)\n`

    const color = getColor(input, options.colors)
    return `${indentation}${colorString(input, color)}\n`
}

export const renderMultilineString = (
    input: string,
    options: RenderOptions,
    indentation: string
): string => {
    const color = getColor(input, options.colors)
    const indentedString = alignString(input, indent(indentation.length))
    const output = `${indentation}"""\n${indentedString}\n${indentation}"""\n`
    return colorString(output, color)
}

export const renderDash = (options: RenderOptions, indentation: string): string => {
    const dashColor = options.colors?.dash
    const output = `${indentation}- `
    return colorString(output, dashColor)
}

export const renderMaxDepth = (indentation: string): string => `${indentation}(max depth reached)\n`

export const renderObjectKey = (
    key: string,
    options: RenderOptions,
    indentation: string
): string => {
    const keyColor = options.colors?.keys
    const output = `${indentation}${key}: `
    return colorString(output, keyColor)
}

export const renderSerializableObjectValue = (
    key: string,
    value: unknown,
    valueColumn: number,
    options: RenderOptions,
    indentation: string
): string | undefined => {
    if (value === undefined && options.hideUndefined) return undefined
    const renderedKey = renderObjectKey(key, options, indentation)
    const alignSpaces = repeat(' ', valueColumn - key.length)
    const renderedValue = renderSerializable(value as string, options, alignSpaces)

    return `${renderedKey}${renderedValue}`
}

export const renderMaxDepthObjectValue = (
    key: string,
    valueColumn: number,
    options: RenderOptions,
    indentation: string
): string => {
    const renderedKey = renderObjectKey(key, options, indentation)
    const alignSpaces = repeat(' ', valueColumn - key.length)
    const renderedValue = renderMaxDepth(alignSpaces)

    return `${renderedKey}${renderedValue}`
}

export const renderSerializableArrayValue = (
    value: string,
    options: RenderOptions,
    indentation: string
): string => {
    const renderedDash = renderDash(options, indentation)
    const renderedValue = renderSerializable(value, options, '')

    return `${renderedDash}${renderedValue}`
}

export const renderMaxDepthArrayValue = (options: RenderOptions, indentation: string): string => {
    const renderedDash = renderDash(options, indentation)
    const renderedValue = renderMaxDepth('')

    return `${renderedDash}${renderedValue}`
}

export const renderErrorStack = (
    stack: string,
    options: RenderOptions,
    indentation: string
): string => {
    const color = getColor(stack, options.colors)
    const indentedDash = renderDash(options, indentation)
    const indentedStack = alignString(stack, indentedDash)

    return colorString(indentedStack, color)
}

export const renderObjectErrorStack = (
    key: string,
    stack: string,
    options: RenderOptions,
    indentation: string
): string => {
    const renderedKey = renderObjectKey(key, options, indentation)
    const stackIndentation = indent(indentation.length)
    const renderedStack = renderErrorStack(stack, options, stackIndentation)
    return `${renderedKey}\n${renderedStack}\n`
}
