import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { LoadingButton, Text } from "app/components"

interface AuthScreenProps {
  onAuthenticate: (auth: boolean) => void
}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen ({
  onAuthenticate,
}: AuthScreenProps) {
  const handleAuthenticate = () => {
    onAuthenticate(true)
  }

  return (
    <View style={$ROOT}>
      <Text text='auth' />
      <View style={{ height: 100, width: 300 }}>
        <LoadingButton label='Authenticate' onPress={handleAuthenticate} />
      </View>
    </View>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
