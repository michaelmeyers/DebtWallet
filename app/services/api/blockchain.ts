import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers"

export interface BlockchainMnemonic {
  phrase: string
}

export interface BlockchainWallet {
  privateKey: string
  publicKey: string
  mnemonic: BlockchainMnemonic
  address: string
}

const { Wallet } = ethers

const createWallet = () => {
  return Wallet.createRandom()
}

const getWalletWithMnemonic = mnemonic => {
  return Wallet.fromMnemonic(mnemonic)
}

const getWalletWithPrivateKey = () => {}

const getWatcherWallet = () => {}

const Blockchain = {
  createWallet,
  getWalletWithMnemonic,
  getWalletWithPrivateKey,
  getWatcherWallet,
}
export default Blockchain
