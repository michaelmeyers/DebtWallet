import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers"

const { Wallet } = ethers

export const createWallet = () => {
  return ethers.Wallet.createRandom()
}

export const getWalletWithMnemonic = () => {}

export const getWalletWithPrivateKey = () => {}

export const getWatcherWallet = () => {}
