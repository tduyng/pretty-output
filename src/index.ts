import type { RenderOptions, Stack } from './definitions'
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

const defaultStack = (input: string): Stack => ({
    input,
    noRender: true,
    indentation: '',
    depth: 0,
})

const parseOptions = (opts: Partial<RenderOptions> = {}): RenderOptions => {
    const optsColors = opts.colors || {}
    const color = {
        keys: optsColors.keys || 'green',
        dash: optsColors.dash || 'green',
        number: optsColors.number || 'blue',
        string: optsColors.string,
        true: optsColors.true || 'green',
        false: optsColors.false || 'red',
        null: optsColors.null || 'grey',
        undefined: optsColors.undefined || 'grey',
    }

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
            output += renderSerializable(input, options, indentation)
        } else if (typeof input === 'string') {
            output += renderMultilineString(input, options, indentation)
        } else if (Array.isArray(input)) {
            for (let i = input.length - 1; i >= 0; i--) {
                const value = input[i]

                if (isSerializable(value)) {
                    const result = renderSerializableArrayValue(value, options, indentation)
                    stack.push(defaultStack(result))
                    continue
                }

                if (depth + 1 > options.maxDepth) {
                    const result = renderMaxDepthArrayValue(options, indentation)
                    stack.push(defaultStack(result))
                    continue
                }

                stack.push({
                    input: value,
                    indentation: indentString(indentation, options),
                    depth: depth + 1,
                })
                const dash = renderDash(options, indentation)
                stack.push(defaultStack(`${dash}\n`))
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
                    stack.push(defaultStack(result))
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
                    if (result !== undefined) stack.push(defaultStack(result))
                    continue
                }

                if (depth + 1 > options.maxDepth) {
                    const result = renderMaxDepthObjectValue(key, valueColumn, options, indentation)
                    stack.push(defaultStack(result))
                    continue
                }

                stack.push({
                    input: value,
                    depth: depth + 1,
                    indentation: indentString(indentation, options),
                })
                const renderedKey = renderObjectKey(key, options, indentation)
                stack.push(defaultStack(`${renderedKey}\n`))
            }
        }
    }

    return output
}

export default prettyOutput
export { prettyOutput }
export { prettyOutput as prettyoutput }
