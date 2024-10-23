export type Color =
    | 'black'
    | 'blue'
    | 'brown'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'grey'
    | 'magenta'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'rainbow'
    | 'red'
    | 'reset'
    | 'white'
    | 'yellow'

export type InputColor = {
    keys?: Color // Object keys color. Default: green
    dash?: Color // Array prefixing values dash. Default: green
    number?: Color // Numbers color. Default: blue
    string?: Color // Strings color. Default: no color
    true?: Color // Boolean value 'true' color. Default: green
    false?: Color // Boolean value 'false' color. Default: red
    null?: Color // 'Null' color. Default: grey
    undefined?: Color // 'Undefined' color. Default: grey
}

export type RenderOptions = {
    indentation: string // Indentation space
    indentationLength?: number // Space count for indentation (optional)
    maxDepth: number // Maximum depth of nested objects/arrays (optional, default: 5)
    noColor?: boolean // Disable coloring (optional, default: false)
    colors?: InputColor // Input colors (optional)
    alignKeyValues?: boolean // Align key values (optional, default: true)
    hideUndefined?: boolean // Show undefined values (optional, default: false)
}
