import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { spacing } from "app/theme"

interface AddWalletScreenProps extends NativeStackScreenProps<AppStackScreenProps<"walletAdd">> {}

export const AddWalletScreen: FC<AddWalletScreenProps> = observer(function AddWalletScreen () {
  // Pull in navigation via hook
  const navigation = useNavigation()

  const handleNavToMnemonicAcknowledgements = () => {
    navigation.navigate("mnemonicAcknowledgements")
  }

  const handleNavToWalletImport = () => {
    navigation.navigate("walletImport")
  }

  return (
    <Screen style={ROOT} preset='scroll'>
      <Text text='Add Wallet' />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={BUTTON_VIEW}>
          <LoadingButton label='Create Wallet' onPress={handleNavToMnemonicAcknowledgements} />
          <LoadingButton label='Import Wallet' onPress={handleNavToWalletImport} />
        </View>
      </View>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  flex: 1,
}

const BUTTON_VIEW: Viewstyle = { paddingVertical: spacing.md, height: 100 }
