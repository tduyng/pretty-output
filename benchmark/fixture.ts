type Weights = Record<string, number>

const makeArray = (): unknown[] => []
const makeObject = (): Record<string, unknown> => ({})
const makeMultilineString = (): string => 'A multi \nline \nstring'
const makeSerializable = (): unknown => {
    const set = [true, false, 1, 2.3, null, new Date(), 'A single line string', []]
    const idx = Math.floor(Math.random() * set.length)
    return set[idx]
}
const makeError = (): Error => new Error('An error')

const weightedRand = (weights: Weights): string | null => {
    const entries = Object.entries(weights)
    const weightSum = entries.reduce((sum, [, weight]) => sum + weight, 0)
    const randomPointer = Math.random() * weightSum

    let runningSum = 0
    for (const [key, weight] of entries) {
        runningSum += weight
        if (randomPointer < runningSum) {
            return key
        }
    }
    return null
}

const weightedRands = (weights: Weights, count: number): (string | null)[] => {
    return Array.from({ length: count }, () => weightedRand(weights))
}

const makeLevelArray = (weights: Weights, keysCount: number): unknown[] => {
    return weightedRands(weights, keysCount).map((type) => {
        switch (type) {
            case 'array':
                return makeArray()
            case 'object':
                return makeObject()
            case 'multilineString':
                return makeMultilineString()
            case 'serializable':
                return makeSerializable()
            case 'error':
                return makeError()
            default:
                return null
        }
    })
}

const makeLevelObject = (weights: Weights, keysCount: number): Record<string, unknown> => {
    return weightedRands(weights, keysCount).reduce(
        (acc, type, index) => {
            const key = `key${index}`
            switch (type) {
                case 'array':
                    acc[key] = makeArray()
                    break
                case 'object':
                    acc[key] = makeObject()
                    break
                case 'multilineString':
                    acc[key] = makeMultilineString()
                    break
                case 'serializable':
                    acc[key] = makeSerializable()
                    break
                case 'error':
                    acc[key] = makeError()
                    break
                default:
                    acc[key] = null
            }
            return acc
        },
        {} as Record<string, unknown>
    )
}

const makeLevelElements = (
    weights: Weights,
    keysCount: number,
    levelElements: unknown[]
): unknown[] => {
    const nextLevel: unknown[] = []

    while (levelElements.length > 0) {
        const currentElement = levelElements.pop()

        if (Array.isArray(currentElement)) {
            const elementContent = makeLevelArray(weights, keysCount)
            currentElement.push(...elementContent)
            nextLevel.push(...elementContent)
        } else if (typeof currentElement === 'object' && currentElement !== null) {
            const elementContent = makeLevelObject(weights, keysCount)
            Object.assign(currentElement, elementContent)
            nextLevel.push(...Object.values(elementContent))
        }
    }

    return nextLevel
}

export const makeElement = (weights: Weights, levels: number, keysCount: number): unknown => {
    const topType = weightedRand({ array: 0.5, object: 0.5 })
    const top = topType === 'array' ? makeArray() : makeObject()

    let levelElements: unknown[] = [top]

    for (let level = 0; level < levels; level++) {
        levelElements = makeLevelElements(weights, keysCount, levelElements)
    }

    return top
}

/*const weights = {serializable: 0.9, array: 0.3, object: 0.4, multilineString: 0.3, error: 0.2}
const levels = 4
const keysCount = 5
console.log(JSON.stringify(exports.makeElement(weights, levels, keysCount)))*/
