import assert from 'assert'
import * as dotenv from 'dotenv'
import { HDNode, isValidMnemonic } from 'ethers/lib/utils'
import words from './words.json'
dotenv.config()

assert(process.env.SEED, 'seed missing')
assert(process.env.TARGET_ADDRESS, 'target address missing')

const mnemonicWords = process.env.SEED.split(' ')

const path = [
  //Ethereum
  `m/44'/60'/0'/0/0`,
  `m/44'/60'/0'/0/1`,
  `m/44'/60'/0'/0/2`,
  `m/44'/60'/0'/0/3`,

  `m/44'/60'/0'/0/0`,
  `m/44'/60'/1'/0/0`,
  `m/44'/60'/2'/0/0`,
  `m/44'/60'/3'/0/0`,

  // `m/44'/60'/0'/0/0`,
  // `m/44'/60'/0'/1/0`,
  // `m/44'/60'/0'/2/0`,
  // `m/44'/60'/0'/3/0`,

  //Ethereum (Ledger Live)
  `m/44'/60'/0/0`,
  `m/44'/60'/0/1`,
  `m/44'/60'/0/2`,
  `m/44'/60'/0/3`,

  // `m/44'/60'/0'/0`,
  // `m/44'/60'/0'/1`,
  // `m/44'/60'/0'/2`,
  // `m/44'/60'/0'/3`,
  //
  // `m/44'/60'/0'/0`,
  // `m/44'/60'/1'/0`,
  // `m/44'/60'/2'/0`,
  // `m/44'/60'/3'/0`,

  // `m/44'/60'/0/0`,
  // `m/44'/60'/1/0`,
  // `m/44'/60'/2/0`,
  // `m/44'/60'/3/0`,
  //
  // `m/44'/60'/0`,
  // `m/44'/60'/1`,
  // `m/44'/60'/2`,
  // `m/44'/60'/3`,
  //
  // `m/44'/1'/0/0`,
  // `m/44'/1'/0/1`,
  // `m/44'/1'/0/2`,
  // `m/44'/1'/0/3`,

  // `m/49'/60'/0'/0/0`,
  // `m/49'/60'/0'/0/1`,
  // `m/49'/60'/0'/0/2`,
  // `m/49'/60'/0'/0/3`,
  //
  // `m/49'/60'/0'/0/0`,
  // `m/49'/60'/1'/0/0`,
  // `m/49'/60'/2'/0/0`,
  // `m/49'/60'/3'/0/0`,
  //
  // `m/49'/60'/0/0`,
  // `m/49'/60'/0/1`,
  // `m/49'/60'/0/2`,
  // `m/49'/60'/0/3`,
  //
  // `m/49'/60'/0/0`,
  // `m/49'/60'/1/0`,
  // `m/49'/60'/2/0`,
  // `m/49'/60'/3/0`,
  //
  //
  // `m/84'/60'/0'/0/0`,
  // `m/84'/60'/0'/0/1`,
  // `m/84'/60'/0'/0/2`,
  // `m/84'/60'/0'/0/3`,
  //
  // `m/84'/60'/0'/0/0`,
  // `m/84'/60'/1'/0/0`,
  // `m/84'/60'/2'/0/0`,
  // `m/84'/60'/3'/0/0`,
  //
  // `m/84'/60'/0/0`,
  // `m/84'/60'/0/1`,
  // `m/84'/60'/0/2`,
  // `m/84'/60'/0/3`,
  //
  // `m/84'/60'/0/0`,
  // `m/84'/60'/1/0`,
  // `m/84'/60'/2/0`,
  // `m/84'/60'/3/0`,
]

// for(let h = 17; h < mnemonicWords.length; h++){
//   console.log('h', h)
for (let k = 0; k < mnemonicWords.length; k++) {
  // console.log('k', k)
  // for (let i = 0; i < words.length; i++) {
  for (let p = 0; p < words.length; p++) {
    const mnemonicWordsTest: Array<string> = Object.assign([], mnemonicWords)
    // mnemonicWordsTest[h] = words[i]
    mnemonicWordsTest[k] = words[p]
    if (isValidMnemonic(mnemonicWordsTest.join(' '))) {
      const hdNodeT = HDNode.fromMnemonic(mnemonicWordsTest.join(' '))
      for (let j = 0; j < path.length; j++) {
        const w = hdNodeT.derivePath(path[j])
        console.log(w.address, path[j])
        if (w.address === process.env.TARGET_ADDRESS) {
          console.log('find', path[j], k, words[p])
          process.exit(0)
        }
      }
    }
  }
  // }
}
// }
