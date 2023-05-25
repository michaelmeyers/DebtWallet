import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers"
import { spacing } from "app/theme"

// TODO: STILL NEED TO FIGURE OUT HOW IT IMPORT ETHERS.... CURRENTLY NOT WORKING

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateWalletScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateWallet">> {}

export const CreateWalletScreen: FC<CreateWalletScreenProps> = observer(
  function CreateWalletScreen () {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [wallet, setWallet] = useState()
    const [inputMnemonic, setInputMnemonic] = useState()

    const handleCreateWallet = () => {
      const newWallet = ethers.Wallet.createRandom()
      setWallet(newWallet)
    }

    const handleImportWallet = () => {
      console.log(inputMnemonic)
      if (inputMnemonic) {
        const importedWallet = ethers.Wallet.fromMnemonic(inputMnemonic)
        setWallet(importedWallet)
      }
    }

    const handleWatchWallet = () => {}

    console.log(wallet?.mnemonic?.phrase)
    return (
      <Screen style={$root} preset='scroll'>
        <Text text='createWallet' />
        {wallet ? (
          <View>
            <Text>{`Address: ${wallet?.address}`}</Text>
            <Text>{`PrivateKey: ${wallet?.privateKey}`}</Text>
            <Text>{`PublicKey: ${wallet?.publicKey}`}</Text>
            <Text>{`Mnemoinc: ${wallet?.mnemonic.phrase}`}</Text>
            <View style={$BUTTON_VIEW}>
              <LoadingButton label='Clear Wallet' onPress={() => setWallet(null)} />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={$BUTTON_VIEW}>
              <LoadingButton label='Create Wallet' onPress={handleCreateWallet} />
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
            <View style={$BUTTON_VIEW}>
              <LoadingButton label='Watcher Wallet' onPress={handleWatchWallet} />
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

const $BUTTON_VIEW: Viewstyle = { paddingVertical: spacing.md }