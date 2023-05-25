import * as Keychain from "react-native-keychain"

const get = async () => {
  try {
    // Retrieve the credentials
    const secureData = await Keychain.getGenericPassword()
    const { password: json } = secureData
    if (json) {
      const mnemonicsByWalletAddress = JSON.parse(json)
      return mnemonicsByWalletAddress
    } else {
      console.log("No credentials stored")
    }
  } catch (error) {
    console.error("Keychain couldn't be accessed!", error)
  }
}

const save = async ({ address, mnemonic }) => {
  try {
    const secureData = await Keychain.getGenericPassword()
    const { username, password: securedJson } = secureData
    let mnemonicsByWalletAddress = {}
    if (username && securedJson) {
      mnemonicsByWalletAddress = JSON.parse(securedJson)
    }
    mnemonicsByWalletAddress[address] = mnemonic
    const json = JSON.stringify(mnemonicsByWalletAddress)
    await Keychain.setGenericPassword("MNEMONIC", json)
    return true
  } catch (error) {
    // error
    return false
  }
}

export const SecureStore = {
  get,
  save,
}
