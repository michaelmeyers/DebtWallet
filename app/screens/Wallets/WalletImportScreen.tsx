import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { spacing, styles } from "app/theme"
import Blockchain from "app/services/api/blockchain"
import { SecureStore } from "app/models/SecureStore"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"

interface WalletImportScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"walletImport">> {}

export const WalletImportScreen: FC<WalletImportScreenProps> = observer(
  function WalletImportScreen () {
    const navigation = useNavigation()
    const { walletStore } = useStores()
    const [inputMnemonic, setInputMnemonic] = useState<string>()

    const handleImportWallet = async () => {
      if (inputMnemonic) {
        const importedWallet = Blockchain.getWalletWithMnemonic(inputMnemonic)
        const { mnemonic, address } = importedWallet || {}
        if (mnemonic?.phrase && address) {
          const saved = await walletStore.saveWallet(mnemonic.phrase, address)
          if (saved) {
            navigation.navigate("wallets")
          }
        }
      }
    }

    const handle = async () => {
      const data = await SecureStore.getData("0xB7584Bc5b5692BAcDC3224643Ff59FbD59164443")
      console.log(data)
    }

    return (
      <Screen style={$root} preset='scroll'>
        <Text text='WalletImport' />
        <View style={{ padding: spacing.lg }}>
          <Text>Secret Phrase</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 2 }}
            value={inputMnemonic}
            onChangeText={text => setInputMnemonic(text)}
          />
        </View>
        <View>
          <LoadingButton
            containerStyle={styles.BUTTON}
            label='Import'
            onPress={handleImportWallet}
          />
          <LoadingButton containerStyle={styles.BUTTON} label='Mnemonic' onPress={handle} />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
