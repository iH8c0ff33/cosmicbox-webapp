import { Bin } from "./event";

describe("Bin", () => {
    it("should parse", () => {
        const bin = Bin.parse('{"start":"2017-12-03T12:10:30Z","count":3}')
        expect(bin).toBeInstanceOf(Object)
    })

    const errors = [
        '{"start":"2017-12-03T12:10:30Z","count":3,"error":"not"}',
        '{"start":"2017-12-03Tcorrupted12:10:30Z","count":3}',
        'random_string'
    ]

    for (const error of errors) {
        it(`should not parse '${error}'`, () => {
            expect(() => Bin.parse(error)).toThrow(SyntaxError)
        })
    }
})