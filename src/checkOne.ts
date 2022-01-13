import assert from 'assert'
import * as dotenv from 'dotenv'
import { HDNode } from 'ethers/lib/utils'
dotenv.config()

assert(process.env.SEED, 'seed missing')
const hdNode = HDNode.fromMnemonic(process.env.SEED)
console.log(hdNode.derivePath(`m/44'/60'/0'/0/0`).address)
