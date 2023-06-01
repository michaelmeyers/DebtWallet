import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { SecureStore } from "app/models/SecureStore"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers"
import { spacing } from "app/theme"

interface CreateWalletScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"createWallet">> {}

export const CreateWalletScreen: FC<CreateWalletScreenProps> = observer(
  function CreateWalletScreen () {
    // Pull in one of our MST stores
    const { walletStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    const [wallet, setWallet] = useState()
    const [inputMnemonic, setInputMnemonic] = useState()
    const [saving, setSaving] = useState(false)
    const { address, privateKey, publicKey, mnemonic } = wallet || {}

    const handleNavToMnemonicAcknowledgements = () => {
      navigation.navigate("mnemonicAcknowledgements")
    }

    const handleCreateWallet = () => {
      const newWallet = ethers.Wallet.createRandom()
      setWallet(newWallet)
    }

    const handleImportWallet = () => {
      if (inputMnemonic) {
        const importedWallet = ethers.Wallet.fromMnemonic(inputMnemonic)
        setWallet(importedWallet)
      }
    }

    const handleSaveWallet = async () => {
      setSaving(true)
      const success = await walletStore.saveWallet(mnemonic?.phrase, address)
      setSaving(false)
    }

    const getData = async () => {
      const data = await SecureStore.getData(address)
    }

    const handleDeleteData = async () => {
      await SecureStore.deleteData(address)
      const data = await SecureStore.getData(address)
      if (!data) {
        setWallet(null)
      }
    }

    return (
      <Screen style={$root} preset='scroll'>
        <Text text='createWallet' />
        {wallet ? (
          <View>
            <Text>{`Address: ${address}`}</Text>
            <Text>{`PrivateKey: ${privateKey}`}</Text>
            <Text>{`PublicKey: ${publicKey}`}</Text>
            <Text>{`Mnemonic: ${mnemonic?.phrase}`}</Text>
            <View style={{ flex: 1 }}>
              <View style={$BUTTON_VIEW}>
                <LoadingButton label='Save Wallet' onPress={handleSaveWallet} loading={saving} />
              </View>
              <View style={$BUTTON_VIEW}>
                <LoadingButton label='Clear Wallet' onPress={() => setWallet(null)} />
              </View>
              <View style={$BUTTON_VIEW}>
                <LoadingButton label='Get Data' onPress={getData} />
              </View>
              <View style={$BUTTON_VIEW}>
                <LoadingButton label='Delete Data' onPress={handleDeleteData} />
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={$BUTTON_VIEW}>
              <LoadingButton label='Create Wallet' onPress={handleNavToMnemonicAcknowledgements} />
            </View>
            <View style={$BUTTON_VIEW}>
              <View>
                <TextInput
                  style={{ borderWidth: 1, borderColor: "black" }}
                  value={inputMnemonic}
                  onChangeText={text => setInputMnemonic(text)}
                />
              </View>
              <LoadingButton label='Import Wallet' onPress={handleImportWallet} />
            </View>
          </View>
        )}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $BUTTON_VIEW: Viewstyle = { paddingVertical: spacing.md, height: 100 }
