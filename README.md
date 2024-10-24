# pretty-output

pretty-output is a fast, customizable library for formatting JavaScript/JSON objects into a human-readable, YAML-style output. 

[![Version npm](https://img.shields.io/npm/v/pretty-output.svg?style=flat-square)](https://www.npmjs.com/package/pretty-output)
[![npm Downloads](https://img.shields.io/npm/dm/pretty-output.svg?style=flat-square)](https://npmcharts.com/compare/pretty-output?minimal=true)
[![build status](https://github.com/tduyng/pretty-output/actions/workflows/ci.yaml/badge.svg)](https://github.com/tduyng/pretty-output/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/tduyng/pretty-output/badge.svg?branch=2.x)](https://coveralls.io/github/tduyng/pretty-output?branch=2.x)

## Features

- **High Performance**: Optimized to be 2-5 times faster and more beautiful than `util.inspect`, making it ideal for real-time logging.
- **Customizable**: Configure indentation, color schemes, depth limits, and more to fit your specific needs.
- **Versatile**: Works as both a `Node.js`, `Deno`, `Bun` library and a CLI tool, giving flexibility for scripts and terminal usage.
- **Color Output**: Easily distinguish keys, strings, numbers, and more with customizable color formatting.
- **Dual Package**: Supports both ES modules and CommonJS, ensuring compatibility with various JavaScript environments.
- **TypeScript Support**: Fully written in TypeScript, offering type safety and modern development practices.
- **Simple and Tested**: Designed for ease of use with a thoroughly tested codebase.
- **Zero Dependencies**: Uses only `commander.js` for the CLI.

## Installation

```bash
npm add pretty-output
yarn add pretty-output
pnpm add pretty-output
```

## Usage

pretty-output is extremely easy to use. Just require it in your project and call the function with your data:

```javascript
import { prettyOutput } from 'pretty-output'

const data = {
  username: 'kic',
  url: 'https://github.com/keepitcool',
  projects: ['prettyoutput', '3m2tuio']
}

console.log(prettyOutput(data))
```

Sample output:

```bash
username: kic
url: https://github.com/keepitcool
projects:
  - pretty-output
  - 3m2tuio
```

Other example:

![Example](docs/images/example.png)

## API

`prettyOutput(data, options, indent)`
### Parameters
```md
 * {*} data                     : The JavaScript or JSON object to format
 * {Object} [options]           : Optional. See options below
 * {number} [indent]            : Optional. Indent all output
```

### Options
```md
 * {number} [indentationLength] : Length of indentation (in terms of space)
 * {number} [maxDepth]          : maximum sublevel of nested objects/arrays output. Default: 3
 * {boolean}[noColor]           : disable colors. Default: false
 * {colors} [colors]            : Output colors. See below
 * {boolean}[alignKeyValues]    : Align key values. Default: true
 * {boolean}[hideUndefined]     : Do not display undefined values. Default: false
```

### Colors Options
```md
 * {string} [keys]              : Objects keys color. Default: green
 * {string} [dash]              : Array prefixing dash ("- "). Default: green
 * {string} [number]            : Numbers color. Default: blue
 * {string} [string]            : Strings color. Default: no color
 * {string} [true]              : Boolean value 'true' color. Default: green
 * {string} [false]             : Boolean value 'false' color. Default: red
 * {string} [null]              : 'Null' color. Default: grey
 * {string} [undefined]         : 'Undefined' color. Default: grey
```

Example using options :
```javascript
import { prettyOutput } from 'pretty-output'

const data = {
  username: 'kic',
  url: 'https://github.com/keepitcool',
  projects: ['pretty-output', '3m2tuio']
};

const options = {
  noColor: true,
  maxDepth: 5,
  colors: {
    keys: 'blue',
    null: 'red'
  }
};

console.log(prettyOutput(data, options, 2));
```

## CLI Usage

You can also use pretty-output directly from the command line to format files or standard input.

Usage:
```bash
# Pretty print a JSON file
prettyoutput package.json       # for ESM
pretty package.json             # for ESM
prettyoutput-esm package.json   # for ESM
pretty-esm package.json         # for ESM
prettyoutput-cjs package.json   # for CJS
pretty package.json             # for CJS
```

Example CLI Output:

![Example](docs/images/cli.png)

### Command Line Options

- `--indent`: Set the indentation level (default: 2).
- `--depth`: Limit the depth of object printing (default: 3).
- `--noColor`: Disable colored output.

```bash
# Format with custom indentation, depth, and no color
prettyoutput --indent=4 --depth=5 --noColor package.json
```

or

```bash
# Indent 4, max depth 5, disable colors
cat package.json | prettyoutput --indent=4 --depth=5 --noColor
```

## Benchmark
Performance is key for logging, and pretty-output is built to be fast. Compared to alternatives like `util.inspect` and `prettyjson`, it consistently performs 2-5 times faster.

### Run Benchmarks
```bash
node benchmark/benchmark.js
```

### Benchmark Results
```
LEVELS | KEYS | LOOPS | WEIGTHS
3      | 20   | 100   | serializable: 0.9    array: 0.3    object: 0.5    multilineString: 0.3    error: 0.2

NAME          | MIN                 | MAX                 | MEAN                | TOTAL
pretty-output | 3 ms 133 µs 526 ns  | 42 ms 563 µs 146 ns | 4 ms 365 µs 617 ns  | 436 ms 561 µs 716 ns
prettyjson    | 9 ms 615 µs 703 ns  | 21 ms 441 µs 595 ns | 11 ms 447 µs 83 ns  | 1 s 144 ms 708 µs 348 ns
util.inspect  | 10 ms 839 µs 974 ns | 24 ms 332 µs 545 ns | 12 ms 526 µs 168 ns | 1 s 252 ms 616 µs 884 ns


LEVELS | KEYS | LOOPS | WEIGTHS
4      | 20   | 100   | serializable: 0.9    array: 0.3    object: 0.5    multilineString: 0.3    error: 0.2

NAME          | MIN                 | MAX                  | MEAN                 | TOTAL
pretty-output | 29 ms 966 µs 837 ns | 102 ms 170 µs 779 ns | 39 ms 502 µs 799 ns  | 3 s 950 ms 279 µs 972 ns
prettyjson    | 86 ms 731 µs 622 ns | 159 ms 166 µs 633 ns | 107 ms 813 µs 674 ns | 10 s 781 ms 367 µs 439 ns
util.inspect  | 90 ms 942 µs 290 ns | 256 ms 995 µs 418 ns | 118 ms 794 µs 343 ns | 11 s 879 ms 434 µs 322 ns


LEVELS | KEYS | LOOPS | WEIGTHS
5      | 20   | 100   | serializable: 0.9    array: 0.3    object: 0.5    multilineString: 0.3    error: 0.2

NAME          | MIN                      | MAX                      | MEAN                     | TOTAL
pretty-output | 616 ms 495 µs 243 ns     | 1 s 602 ms 965 µs 211 ns | 768 ms 761 µs 315 ns     | 76 s 876 ms 131 µs 544 ns
prettyjson    | 1 s 294 ms 734 µs 939 ns | 1 s 686 ms 600 µs 593 ns | 1 s 490 ms 394 µs 707 ns | 149 s 39 ms 470 µs 777 ns
util.inspect  | 1 s 623 ms 160 µs 631 ns | 2 s 460 ms 983 µs 994 ns | 1 s 731 ms 699 µs 847 ns | 173 s 169 ms 984 µs 758 ns

```

## Testing

Clone the repository and install development dependencies:

```bash
yarn install
```

Run tests:

```bash
yarn test
```

## Contribution
If you'd like to contribute to this project, feel free to submit issues and pull requests. Contributions are always welcome!

## Credits

**pretty-output** is based on the original [prettyoutput](https://github.com/keepitcool/prettyoutput) project, which is now archived. Special thanks to [@bnadim](https://github.com/bnadim) for creating the original project, and to all contributors who helped enhance it over time.