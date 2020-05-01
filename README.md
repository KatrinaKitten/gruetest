# gruetest

A lightweight, minimalistic testing framework for Typescript.

## Installation

```
npm i --save-dev gruetest
```

```json
// package.json
{
  "scripts": {
    "test": "npm explore gruetest -- npm test -- path/to/test/folder"
  }
}
```

## Usage

```js
import describe from 'gruetest'

describe('Test Category', it => {
  it('should do something correctly', assert => {
    // If the two parameters are not equal, the test will fail.
    assert.equal(2+2, 4, 'optional message shown next to failed assertions')

    // Use this for testing random or inconsistent things.
    testConsistency(
      () => Math.random(), // A function to get the tested value.
      num => assert.inRange(num, 0, 1, 'Math.random range'),
      500 // The number of times to run the test (default: 10000)
    )
  })
})
```

## Assert Methods

| Method | Description
| :-- | :--
| `truth` | Assert that the parameter is truthy.
| `equal` | Assert that two parameters are equal (`==`).
| `strictEqual` | Assert that two parameters are strictly equal (`===`).
| `notEqual` | Assert that two parameters are not equal (`!=`).
| `strictNotEqual` | Assert that two parameters are strictly not equal (`!==`).
| `greaterThan` | Assert that the first numeric parameter is greater than the second.
| `lessThan` | Assert that the first numeric parameter is less than the second.
| `greaterOrEqual` | Assert that the first numeric parameter is greater than or equal to the second.
| `lessOrEqual` | Assert that the first numeric parameter is less than or equal to the second.
| `inArray` | Assert that the first parameter is contained in the array passed as the second.
| `inRange` | Assert that the first numeric parameter is within a range defined by the second and third (inclusive).
| `notInRange` | Assert that the first numeric parameter is within a range defined by the second and third (inclusive).
| `notInArray` | Assert that the first parameter is not contained in the array passed as the second.
| `matchPred` | Assert that the function passed as the second parameter returns true when passed the first.
| `throws` | Assert that the function passed as the first parameter throws, and the exception matches the predicate passed as the second.
