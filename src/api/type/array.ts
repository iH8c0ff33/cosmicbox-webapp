export function parseArray<T>(json: string): T[] {
    const array = JSON.parse(json)
    if (array instanceof Array === false)
        throw new SyntaxError("array expected")
    return array
}