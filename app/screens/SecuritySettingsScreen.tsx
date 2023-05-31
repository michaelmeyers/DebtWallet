import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, Switch, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { AuthTypes, useStores } from "app/models"
import { styles } from "app/theme"

interface SecuritySettingsScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"securitySettings">> {}

export const SecuritySettingsScreen: FC<SecuritySettingsScreenProps> = observer(
  function SecuritySettingsScreen () {
    // Pull in one of our MST stores
    const { settingsStore } = useStores()
    const { appLock } = settingsStore

    const handleSettingChange = (key, value) => {
      appLock.update(key, value)
    }

    const toggle = () => {
      if (appLock.authType === AuthTypes.bio) {
        handleSettingChange("authType", AuthTypes.pin)
      } else {
        handleSettingChange("authType", AuthTypes.bio)
      }
    }

    return (
      <Screen style={$root} preset='scroll'>
        <Text text='securitySettings' />
        <Switch
          value={appLock.enable}
          onValueChange={value => handleSettingChange("enable", value)}
        />
        <LoadingButton label={appLock.authType} onPress={toggle} />
        <View>
          <Text>Lock Duration</Text>
          <Text>{appLock.validationTimer.toString()}</Text>
          <View style={styles.ROW}>
            <LoadingButton label='NOW' onPress={() => handleSettingChange("validationTimer", 0)} />
            <LoadingButton
              label='1 MIN'
              onPress={() => handleSettingChange("validationTimer", 60000)}
            />
          </View>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
