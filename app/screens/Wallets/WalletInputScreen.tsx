import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WalletInputScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"WalletInput">> {}

export const WalletInputScreen: FC<WalletInputScreenProps> = observer(function WalletInputScreen () {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [wallet, setWallet] = useState()

  const handleCreateWallet = () => {}
  return (
    <Screen style={$root} preset='scroll'>
      <Text text='walletInput' />
      {wallet ? (
        <View style={{ padding: spacing.lg }}>
          <Text>Secret Phrase</Text>
          <TextInput style={{ borderColor: "black", borderWidth: 2 }} value={wallet.phrase} />
        </View>
      ) : (
        <View>
          <LoadingButton label='Create Wallet' onPress={handleCreateWallet} />
        </View>
      )}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
