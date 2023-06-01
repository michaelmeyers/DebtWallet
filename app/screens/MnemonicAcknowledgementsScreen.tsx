import React, { FC, useReducer } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, MnemonicAcknowledgements, Screen } from "app/components"
import { styles } from "app/theme"
import { useNavigation } from "@react-navigation/native"

interface MnemonicAcknowledgementsScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"mnemonicAcknowledgements">> {}

const defaultStatus = {
  lose: false,
  expose: false,
  responsibility: false,
}

export const MnemonicAcknowledgementsScreen: FC<MnemonicAcknowledgementsScreenProps> = observer(
  function MnemonicAcknowledgementsScreen () {
    const navigation = useNavigation()
    const [selectStatus, setSelectStatus] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      defaultStatus,
    )

    const resetSelectStatus = () => {
      setSelectStatus(defaultStatus)
    }

    const handleStatusChange = (key, value) => {
      setSelectStatus({ [key]: value })
    }

    const handleConfirm = () => {
      navigation.navigate("mnemonic")
      resetSelectStatus()
    }

    const disabled = !selectStatus.expose || !selectStatus.responsibility || !selectStatus.lose

    return (
      <Screen style={$ROOT}>
        <ScrollView>
          <MnemonicAcknowledgements
            onStatusChange={handleStatusChange}
            selectStatus={selectStatus}
          />
        </ScrollView>
        <View style={styles.FOOTER_VIEW}>
          <LoadingButton
            label='Continue'
            containerStyle={styles.BUTTON}
            disabled={disabled}
            onPress={handleConfirm}
            // iconName={["fas", "caret-right"]}
          />
        </View>
      </Screen>
    )
  },
)

const $ROOT: ViewStyle = {
  flex: 1,
}
