import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, LoadingButton, MnemonicOrder } from "app/components"
import { styles } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface MnemonicOrderScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"mnemonicOrder">> {}

export const MnemonicOrderScreen: FC<MnemonicOrderScreenProps> = observer(
  function MnemonicOrderScreen () {
    // Pull in one of our MST stores
    const { walletStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [disabled, setdisabled] = useState(true)
    const handleMnemonicInCorrectOrder = isCorrect => {
      setdisabled(!isCorrect)
    }

    const handleStoreWallet = () => {
      walletStore.saveWallet()
    }

    return (
      <Screen style={$root}>
        <ScrollView>
          <MnemonicOrder
            mnemonicPhrase={
              "first second third fourth fifth sixth seventh eighth nineth tenth eleventh twelfeth"
            }
            onCorrectOrder={handleMnemonicInCorrectOrder}
          />
        </ScrollView>
        <View style={styles.FOOTER_VIEW}>
          <LoadingButton
            label='Continue'
            containerStyle={styles.BUTTON}
            onPress={handleStoreWallet}
            iconName={["fas", "caret-right"]}
            disabled={disabled}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
