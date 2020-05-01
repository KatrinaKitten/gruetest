import describe, { Assert } from '..'

describe('Assertion functions', it => {
  it('should properly assert truth', assert => {
    let testAssert = new Assert([])

    testAssert.truth(true)
    testAssert.truth(1234)
    testAssert.truth(false)

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], true)
    assert.equal(testAssert.__ctx[2], 'expected: truthy value\nactual: false')
  })

  it('should properly assert equality', assert => {
    let testAssert = new Assert([])

    testAssert.equal(2+2, 4)
    testAssert.strictEqual(2+2, 4)
    testAssert.notEqual(2+2, 5)
    testAssert.strictNotEqual(2+2, 5)

    assert.truth(testAssert.__ctx.every(r => r === true))
    testAssert.__ctx.splice(0)

    testAssert.equal(2+2, 5)
    testAssert.strictEqual(2+2, 5)
    testAssert.notEqual(2+2, 4)
    testAssert.strictNotEqual(2+2, 4)

    assert.equal(testAssert.__ctx[0], 'expected: 5\nactual: 4')
    assert.equal(testAssert.__ctx[1], 'expected: 5\nactual: 4')
    assert.equal(testAssert.__ctx[2], 'expected: 4 != 4')
    assert.equal(testAssert.__ctx[3], 'expected: 4 !== 4')
  })

  it('should properly assert comparisons', assert => {
    let testAssert = new Assert([])

    testAssert.greaterThan(4, 2)
    testAssert.lessThan(2, 4)
    testAssert.greaterOrEqual(4, 2)
    testAssert.greaterOrEqual(4, 4)
    testAssert.lessOrEqual(2, 4)
    testAssert.lessOrEqual(4, 4)

    assert.truth(testAssert.__ctx.every(r => r === true))
    testAssert.__ctx.splice(0)

    testAssert.greaterThan(2, 4)
    testAssert.lessThan(4, 2)
    testAssert.greaterOrEqual(2, 4)
    testAssert.lessOrEqual(4, 2)

    assert.equal(testAssert.__ctx[0], 'expected: > 4\nactual: 2')
    assert.equal(testAssert.__ctx[1], 'expected: < 2\nactual: 4')
    assert.equal(testAssert.__ctx[2], 'expected: >= 4\nactual: 2')
    assert.equal(testAssert.__ctx[3], 'expected: <= 2\nactual: 4')
  })

  it('should properly assert ranges', assert => {
    let testAssert = new Assert([])

    testAssert.inRange(4, 0, 4)
    testAssert.inRange(4, 4, 8)
    testAssert.inRange(4, 8, 12)

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], true)
    assert.equal(testAssert.__ctx[2], 'expected: in range 8 to 12\nactual: 4')
    testAssert.__ctx.splice(0)

    testAssert.notInRange(4, 8, 12)
    testAssert.notInRange(4, 0, 3)
    testAssert.notInRange(4, 0, 4)

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], true)
    assert.equal(testAssert.__ctx[2], 'expected: not in range 0 to 4\nactual: 4')
  })

  it('should properly assert array presence', assert => {
    let testAssert = new Assert([])

    testAssert.inArray(4, [1,2,3,4])
    testAssert.inArray(4, [5,6,7,8])

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], 'expected: in [5,6,7,8]\nactual: 4')
    testAssert.__ctx.splice(0)

    testAssert.notInArray(5, [1,2,3,4])
    testAssert.notInArray(5, [5,6,7,8])

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], 'expected: not in [5,6,7,8]\nactual: 5')
  })

  it('should properly assert predicates', assert => {
    let testAssert = new Assert([])

    testAssert.matchPred('abcd', s => s[0] === 'a')
    testAssert.matchPred('efgh', s => s[0] === 'a')

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], 'did not match predicate\nactual: efgh')
  })

  it('should properly assert throws', assert => {
    let testAssert = new Assert([])

    testAssert.throws(() => { throw 'abcd' }, e => e === 'abcd')
    testAssert.throws(() => { throw 'efgh' }, e => e === 'abcd')
    testAssert.throws(() => {}, e => e === 'abcd')

    assert.equal(testAssert.__ctx[0], true)
    assert.equal(testAssert.__ctx[1], 'did not throw expected exception\nactual: efgh')
    assert.equal(testAssert.__ctx[2], 'did not throw expected exception\nactual: undefined')
  })
})
