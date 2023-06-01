import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, MnemonicDisplay, Screen, Text } from "app/components"
import { styles } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MnemonicScreenProps extends NativeStackScreenProps<AppStackScreenProps<"mnemonic">> {}

export const MnemonicScreen: FC<MnemonicScreenProps> = observer(function MnemonicScreen () {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const handleContinue = () => {
    navigation.navigate("mnemonicOrder")
  }

  return (
    <Screen style={$root}>
      <ScrollView>
        <MnemonicDisplay
          mnemonicPhrase={
            "first second third fourth fifth sixth seventh eighth nineth tenth eleventh twelfeth"
          }
          orientation='vertical'
        />
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
