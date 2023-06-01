import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface SettingsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"settings">> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen () {
  // Pull in one of our MST stores
  const { settingsStore } = useStores()
  const { settings } = settingsStore

  // Pull in navigation via hook
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const handleNavToSecuritySettings = () => {
    navigation.navigate("securitySettings")
  }

  return (
    <Screen style={$root} preset='scroll'>
      <Text text='settings' />
      <View style={{ height: 50, width: 150 }}>
        <LoadingButton label='Security' onPress={handleNavToSecuritySettings} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
