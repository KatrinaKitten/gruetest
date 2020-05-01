import { failTests } from './runtests'

const failMark = '\u001B[1;31m✗\u001B[0m'
const succMark = '\u001B[1;32m✓\u001B[0m'
const todoMark = '\u001B[1;33m!\u001B[0m'

type AssertCtx = (true|string)[]
type DescribeBody = (it: (text: string, body: ItBody) => void, todo: (text: string) => void) => void
type ItBody = (assert: Assert) => void

export default function describe(name: string, body: DescribeBody) {
  console.log(`\u001b[1m${name}\u001B[0m`)
  body(function it(text: string, body: ItBody) {
    let assertCtx: AssertCtx = []
    body(new Assert(assertCtx))

    let succ = assertCtx.reduce((a,b) => a && (b === true), true as boolean)
    console.log(`  ${succ ? succMark : failMark} ${text}`)

    if(!succ) {
      failTests()
      for(let res of assertCtx.filter((x,i) => assertCtx.indexOf(x) === i )) {
        if(res === true) continue
        console.log(indent(res, 6))
      }
    }
  }, function todo(text: string) {
    console.log(`  ${todoMark} ${text}\n      \u001B[1;33mTODO:\u001B[0m Implement test`)
  })
}

export function testConsistency<T>(getParam: () => T, body: (param: T) => void, numTests: number = 10000) {
  let params = new Array(numTests).fill(0).map(getParam)
  for(let param of params) body(param)
  return params
}

export class Assert {
  /** @internal */ readonly __ctx = this.ctx
  /** @internal */ constructor(private ctx: AssertCtx) {}
 
  truth(a: any, label?:string) {
    this.ctx.push(!!a || `expected: truthy value${label ? ` (${label})` : ''}\nactual: ${a}`)
  }

  equal<T>(a: T, b: T, label?:string) { 
    this.ctx.push(a == b || `expected: ${b}${label ? ` (${label})` : ''}\nactual: ${a}`) 
  }
  strictEqual<T>(a: T, b: T, label?:string) { 
    this.ctx.push(a === b || `expected: ${b}${label ? ` (${label})` : ''}\nactual: ${a}`) 
  }
  notEqual<T>(a: T, b: T, label?:string) { 
    this.ctx.push(a != b || `expected: ${a} != ${b}${label ? ` (${label})` : ''}`) 
  }
  strictNotEqual<T>(a: T, b: T, label?:string) { 
    this.ctx.push(a !== b || `expected: ${a} !== ${b}${label ? ` (${label})` : ''}`) 
  }

  greaterThan(a: number, b: number, label?:string) {
    this.ctx.push(a > b || `expected: > ${b}${label ? ` (${label})` : ''}\nactual: ${a}`)
  }
  lessThan(a: number, b: number, label?:string) {
    this.ctx.push(a < b || `expected: < ${b}${label ? ` (${label})` : ''}\nactual: ${a}`)
  }
  greaterOrEqual(a: number, b: number, label?:string) {
    this.ctx.push(a >= b || `expected: >= ${b}${label ? ` (${label})` : ''}\nactual: ${a}`)
  }
  lessOrEqual(a: number, b: number, label?:string) {
    this.ctx.push(a <= b || `expected: <= ${b}${label ? ` (${label})` : ''}\nactual: ${a}`)
  }

  inRange(a: number, min: number, max: number, label?:string) {
    this.ctx.push(a >= min && a <= max || `expected: in range ${min} to ${max}${label ? ` (${label})` : ''}\nactual: ${a}`)
  }

  inArray<T>(a: T, arr: any[], label?:string) {
    this.ctx.push(arr.includes(a) || `expected: in [${arr.join(',')}]${label ? ` (${label})` : ''}\nactual: ${a}`)
  }

  matchPred<T>(a: T, pred: (a: T) => boolean, label?:string) {
    this.ctx.push(pred(a) || `${a} did not match predicate${label ? ` (${label})` : ''}\nactual: ${a}`)
  }

  throws(tryBody: () => void, catchPred: (e: any) => boolean, label?:string) {
    let caught = false, ex
    try { tryBody() } catch(e) { ex = e; caught = catchPred(e) }
    this.ctx.push(caught || `did not throw expected exception${label ? ` (${label})` : ''}\nactual: ${ex}`)
  }
}

function indent(str: string, by: string|number): string {
  if(typeof by === 'number') by = ' '.repeat(by)
  return str.split('\n').map(x=>by+x).join('\n')
}
