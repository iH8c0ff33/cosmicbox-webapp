import { parseArray } from "./array"

export class Bin {
    static parse(json: string): Bin {
        return JSON.parse(json, Bin.reviver)
    }

    static parseMany(json: string): Bin[] {
        if (json === "") { return [] }
        const array = parseArray<Bin>(json)
        const elements = [] as Bin[]
        
        for (const element of array) {
            elements.push(Bin.parse(JSON.stringify(element)))
        }

        return elements
    }

    private static reviver(key: string, value: {}): {} {
        switch (key) {
            case "":
                return value
            case "start":
                if (typeof value !== "string")
                    throw new SyntaxError('"start" must be a string')
                const start = Date.parse(value)
                if (isNaN(start))
                    throw new SyntaxError(`"${value}" could not be parsed as date`)
                return new Date(start)
            case "count":
                if (typeof value !== "number") {
                    throw new SyntaxError('"count" must be a number')
                }
                return value
            default:
                throw new SyntaxError(`unexpected key "${key}"`)
        }
    }

    constructor(public start: Date, public count: Number) { }
}