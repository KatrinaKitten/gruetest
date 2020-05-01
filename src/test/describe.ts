import describe from "..";
import { unfailTests } from "../runtests";

describe('Describe function', it => {
  it('should properly output test results', assert => {
    let log = console.log, logged: string[] = []
    console.log = (...s: any[]) => logged.push(s.join(' '))

    describe('Test description', (it,todo) => {
      it('should output successful tests', assert => assert.truth(true))
      it('should output failed tests', assert => assert.truth(false))
      todo('should output todos')
    })

    assert.equal(logged[0], '\u001b[1mTest description\u001B[0m')
    assert.equal(logged[1], '  \u001B[1;32m✓\u001B[0m should output successful tests')
    assert.equal(logged[2], '  \u001B[1;31m✗\u001B[0m should output failed tests')
    assert.equal(logged[3], '      expected: truthy value\n      actual: false')
    assert.equal(logged[4], '  \u001B[1;33m!\u001B[0m should output todos\n      \u001B[1;33mTODO:\u001B[0m Implement test')
    assert.equal(logged.length, 5)

    console.log = log
    unfailTests()
  })
})
