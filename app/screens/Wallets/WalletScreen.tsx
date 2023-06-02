import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface WalletScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Wallet">> {}

export const WalletScreen: FC<WalletScreenProps> = observer(function WalletScreen () {
  // Pull in navigation via hook
  const navigation = useNavigation()
  // Pull in one of our MST stores
  const { walletStore } = useStores()
  const { selectedWalletAddress, walletsByAddress } = walletStore
  const selectedWallet = walletsByAddress?.[selectedWalletAddress]

  const handleNavToCreateWallet = () => {
    navigation.navigate("AddWallet")
  }

  const handleNavToWallets = () => {
    navigation.navigate("wallets")
  }
  return (
    <Screen style={$ROOT} preset='scroll'>
      <Text text='Selected Wallet' />
      <Text>{selectedWallet.nickname}</Text>
      <Text>{selectedWallet.address}</Text>
      <View style={$SPACER_VIEW}>
        <LoadingButton label='Add Wallet' onPress={handleNavToCreateWallet} />
      </View>
      <View style={$SPACER_VIEW}>
        <LoadingButton label='All Wallets' onPress={handleNavToWallets} />
      </View>
    </Screen>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
}

const $SPACER_VIEW: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-around",
}
