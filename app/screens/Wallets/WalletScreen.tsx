import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WalletScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Wallet">> {}

export const WalletScreen: FC<WalletScreenProps> = observer(function WalletScreen () {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const handleNavToCreateWallet = () => {
    navigation.navigate("CreateWallet")
  }
  return (
    <Screen style={$ROOT} preset='scroll'>
      <Text text='wallet' />
      <View style={$SPACER_VIEW}>
        <LoadingButton label='Add Wallet' onPress={handleNavToCreateWallet} />
      </View>
    </Screen>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
}

const $SPACER_VIEW: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "space-around",
}
