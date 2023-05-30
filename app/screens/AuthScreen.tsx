import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { LoadingButton, ShakeView, Text } from "app/components"
import * as LocalAuthentication from "expo-local-authentication"

interface AuthScreenProps {
  onAuthenticate: (auth: boolean) => void
}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen ({
  onAuthenticate,
}: AuthScreenProps) {
  const usePin = true
  const shakeView = useRef()
  const [authStuff, setAuthStuff] = useState(null)

  useEffect(() => {
    handleBioAuthenticate(!usePin)
  }, [usePin])

  const handleBioAuthenticate = async useFaceId => {
    if (useFaceId) {
      const { success } = await LocalAuthentication.authenticateAsync()
      if (success) {
        onAuthenticate(true)
      }
    }
  }

  return (
    <View style={$ROOT}>
      <Text text='auth' />
      {/* {usePin ? <PinView /> : <BioAuthView />} */}

      {authStuff ? (
        <Text>{JSON.stringify(authStuff)}</Text>
      ) : (
        <View style={{ height: 100, width: 300 }}>
          <LoadingButton label='Authenticate' onPress={() => onAuthenticate(true)} />
        </View>
      )}
      <ShakeView style={{ height: 200, width: 300 }} ref={shakeView}>
        <LoadingButton label='Shake' onPress={() => shakeView.current.shake()} />
      </ShakeView>
    </View>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
