import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WalletScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Wallet">> {}

export const WalletScreen: FC<WalletScreenProps> = observer(function WalletScreen () {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset='scroll'>
      <Text text='wallet' />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
