import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { SecureStore } from "app/models/SecureStore"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
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
      <Screen style={ROOT} preset='scroll'>
        <Text text='createWallet' />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={BUTTON_VIEW}>
            <LoadingButton label='Create Wallet' onPress={handleNavToMnemonicAcknowledgements} />
            <LoadingButton label='Import Wallet' onPress={handleImportWallet} />
          </View>
        </View>
      </Screen>
    )
  },
)

const ROOT: ViewStyle = {
  flex: 1,
}

const BUTTON_VIEW: Viewstyle = { paddingVertical: spacing.md, height: 100 }
