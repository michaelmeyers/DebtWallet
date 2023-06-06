import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { providers, Wallet, Contract } from "ethers"

enum ChainId {
  testnet = 97,
  mainnet = 56,
}

enum RPC {
  testnet = "https://data-seed-prebsc-1-s1.binance.org:8545/",
}

const getProvider = async key => {
  const chainId = ChainId[key]
  const network = providers.getNetwork(chainId)
  const rpc = RPC?.[key]
  const provider = new providers.JsonRpcProvider(rpc, network)
  return provider
}

const createWallet = (): Wallet => {
  return Wallet.createRandom()
}

const getWalletWithMnemonic = (mnemonic: string): Wallet => {
  return Wallet.fromMnemonic(mnemonic)
}

const getWalletWithPrivateKey = () => {}

const getWatcherWallet = () => {}

const getContract = (contractAddress, abi, provider) => {
  return new Contract(contractAddress, abi, provider)
}

const walletBalance = () => {
  // contract address
  // Pass in a signer or pass in all of the elements to make a signer?
}

const Blockchain = {
  getProvider,
  createWallet,
  getWalletWithMnemonic,
  getWalletWithPrivateKey,
  getWatcherWallet,
  getContract,
}
export default Blockchain
