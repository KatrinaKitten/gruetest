import describe, { testConsistency } from '..';

describe('Consistency tests', it => {
  it('should run 10,000 times by default', assert => {
    let runs = 0
    testConsistency(() => runs, r => ++runs)
    assert.equal(runs, 10000)
  })

  it('should run the specified number of times', assert => {
    let runs = 0
    testConsistency(() => runs, r => ++runs, 500)
    assert.equal(runs, 500)
  })

  it('should call the provider function each run', assert => {
    let runs = 0, provs = 0
    testConsistency(() => ++provs, p => assert.equal(p, ++runs))
    assert.equal(provs, runs)
  })
})
