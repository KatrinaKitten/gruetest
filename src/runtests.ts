import * as fs from 'fs'
import { isAbsolute, join as joinPath, normalize } from 'path'

/** Mark tests as having failed. @internal */
export const failTests = () => testsFailed = true
let testsFailed = false

function _run(dirpath: string, reqpath: string) {
  if(!fs.existsSync(dirpath)) throw 'Test directory does not exist.'
  for(let file of fs.readdirSync(dirpath))
    if(file.endsWith('.js')) require(joinPath(reqpath, file))
}

/**
 * Run all tests in a given directory.
 * @param testPath The path to the test directory.
 * @param exitOnFail Whether to exit the process if a test fails.
 * @param noLift If true, relative paths are treated as exact rather than being prepended with `../../`.
 */
export function runTests(testPath: string, exitOnFail: boolean = false, noLift: boolean = false) {
  if(isAbsolute(testPath)) _run(testPath, testPath)
  else if(noLift) _run(testPath, joinPath('../', testPath))
  else _run(joinPath('../../', testPath), joinPath('../../../', testPath))

  console.log()
  if(testsFailed && exitOnFail) return process.exit(-1)
  let ret = !testsFailed; testsFailed = false
  return ret
}

if(require.main === module) {
  if(!process.argv[2]) throw 'Could not run tests; please specify a path to your tests folder.'
  const testPath = normalize(process.argv[2])
  runTests(testPath, true, ['--noLift','-nl'].includes(process.argv[3]))
}
