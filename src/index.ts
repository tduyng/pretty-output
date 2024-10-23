import type { InputColor, RenderOptions, Stack } from './definitions'
import {
    indentString,
    renderDash,
    renderMaxDepth,
    renderMaxDepthArrayValue,
    renderMaxDepthObjectValue,
    renderMultilineString,
    renderObjectErrorStack,
    renderObjectKey,
    renderSerializable,
    renderSerializableArrayValue,
    renderSerializableObjectValue,
} from './renderer'
import { indent, isSerializable, maxLength } from './utils'

export const defaultInputColor: InputColor = {
    keys: 'green',
    dash: 'green',
    number: 'blue',
    true: 'green',
    false: 'red',
    null: 'grey',
    undefined: 'grey',
}

const defaultIndentation = ''
const parseOptions = (opts: Partial<RenderOptions> = {}): RenderOptions => {
    const color = opts.colors || defaultInputColor

    return {
        indentation: indent(opts.indentationLength || 2),
        maxDepth: opts.maxDepth ?? 3,
        colors: !opts.noColor ? color : undefined,
        alignKeyValues: opts.alignKeyValues !== false,
        hideUndefined: opts.hideUndefined ?? false,
    }
}

const prettyOutput = (input: unknown, opts?: Partial<RenderOptions>, indentLevel = 0): string => {
    const options = parseOptions(opts)
    const stack: Stack[] = [{ indentation: indent(indentLevel), depth: 0, input }]

    let output = ''

    while (stack.length > 0) {
        const item = stack.pop()
        if (!item) continue
        const { indentation, depth, input, noRender } = item

        if (noRender) {
            output += input as string
        } else if (depth > options.maxDepth) {
            output += renderMaxDepth(indentation)
        } else if (isSerializable(input)) {
            output += renderSerializable(String(input), options, indentation)
        } else if (typeof input === 'string') {
            output += renderMultilineString(input, options, indentation)
        } else if (Array.isArray(input)) {
            for (let i = input.length - 1; i >= 0; i--) {
                const value = input[i]

                if (isSerializable(value)) {
                    const result = renderSerializableArrayValue(String(value), options, indentation)
                    stack.push({
                        input: result,
                        noRender: true,
                        indentation: defaultIndentation,
                        depth: 0,
                    })
                    continue
                }

                if (depth + 1 > options.maxDepth) {
                    const result = renderMaxDepthArrayValue(options, indentation)
                    stack.push({
                        input: result,
                        noRender: true,
                        indentation: defaultIndentation,
                        depth: 0,
                    })
                    continue
                }

                stack.push({
                    input: value,
                    indentation: indentString(indentation, options),
                    depth: depth + 1,
                })
                const dash = renderDash(options, indentation)
                stack.push({
                    input: `${dash}\n`,
                    noRender: true,
                    indentation: defaultIndentation,
                    depth: 0,
                })
            }
        } else if (typeof input === 'object' && input !== null) {
            const keys = Object.getOwnPropertyNames(input)
            const valueColumn = options.alignKeyValues ? maxLength(keys) : 0

            for (let i = keys.length - 1; i >= 0; i--) {
                const key = keys[i]
                if (!key) continue
                const value = (input as Record<string, unknown>)[key]

                if (input instanceof Error && key === 'stack') {
                    const result = renderObjectErrorStack(
                        key,
                        value as string,
                        options,
                        indentation
                    )
                    stack.push({
                        input: result,
                        noRender: true,
                        indentation: defaultIndentation,
                        depth: 0,
                    })
                    continue
                }

                if (isSerializable(value)) {
                    const result = renderSerializableObjectValue(
                        key,
                        value,
                        valueColumn,
                        options,
                        indentation
                    )
                    if (result !== undefined)
                        stack.push({
                            input: result,
                            noRender: true,
                            indentation: defaultIndentation,
                            depth: 0,
                        })
                    continue
                }

                if (depth + 1 > options.maxDepth) {
                    const result = renderMaxDepthObjectValue(key, valueColumn, options, indentation)
                    stack.push({
                        input: result,
                        noRender: true,
                        indentation: defaultIndentation,
                        depth: 0,
                    })
                    continue
                }

                stack.push({
                    input: value,
                    depth: depth + 1,
                    indentation: indentString(indentation, options),
                })
                const renderedKey = renderObjectKey(key, options, indentation)
                stack.push({
                    input: `${renderedKey}\n`,
                    noRender: true,
                    indentation: defaultIndentation,
                    depth: 0,
                })
            }
        }
    }

    return output
}

export default prettyOutput
export { prettyOutput }
export { prettyOutput as prettyoutput }
