import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { LoadingButton, MnemonicDisplay, Screen } from "app/components"
import { styles } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import BlockChain, { BlockchainWallet } from "app/services/api/blockchain"
import * as Clipboard from "expo-clipboard"
// import { useStores } from "app/models"

interface MnemonicScreenProps extends NativeStackScreenProps<AppStackScreenProps<"mnemonic">> {}

export const MnemonicScreen: FC<MnemonicScreenProps> = observer(function MnemonicScreen () {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const [wallet, setWallet] = useState<BlockchainWallet>()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const handleContinue = () => {
    navigation.navigate("mnemonicOrder", { blockchainWallet: wallet })
  }

  useEffect(() => {
    if (!wallet) {
      handleCreateWallet()
    }
  }, [wallet])

  const handleCreateWallet = () => {
    const newWallet = BlockChain.createWallet()
    setWallet(newWallet)
  }

  const handleCopy = async string => {
    await Clipboard.setStringAsync(string)
  }

  return (
    <Screen style={$root}>
      <ScrollView>
        <MnemonicDisplay mnemonicPhrase={wallet?.mnemonic?.phrase} orientation='vertical' />
        <View>
          <LoadingButton label='Copy' onPress={() => handleCopy(wallet?.mnemonic?.phrase)} />
        </View>
      </ScrollView>
      <View style={styles.FOOTER_VIEW}>
        <LoadingButton
          label='Continue'
          containerStyle={styles.BUTTON}
          onPress={handleContinue}
          iconName={["fas", "caret-right"]}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
