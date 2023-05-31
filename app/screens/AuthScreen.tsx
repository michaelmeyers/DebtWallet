import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image } from "react-native"
import { ShakeView, Text } from "app/components"
import * as LocalAuthentication from "expo-local-authentication"
import { AuthTypes, useStores } from "app/models"
import { PinInput } from "app/components/PinInput"
import image from "../../ignite/templates/app-icon/ios-universal.png"
import { durationInMiliseconds, userVisibleDuration } from "app/utils/timeout"

interface AuthScreenProps {
  onAuthenticate: (auth: boolean) => void
}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen ({
  onAuthenticate,
}: AuthScreenProps) {
  const { settingsStore } = useStores()
  const { appLock } = settingsStore || {}
  const { authType } = appLock
  const [usePin, setUsePin] = useState(authType === AuthTypes.pin)
  const [attempts, setAttempts] = useState(5)
  const [timeoutCount, setTimeoutCount] = useState(0)

  const shakeView = useRef()
  const pinInput = useRef()

  const [pin, setPin] = useState("")

  useEffect(() => {
    if (authType === AuthTypes.bio) {
      handleBioAuthenticate(!usePin)
    }
    if (authType === AuthTypes.pin) {
      pinInput.current.focus()
    }
  }, [authType])

  useEffect(() => {}, [attempts])

  useEffect(() => {
    if (timeoutCount > 0) {
      pinInput.current.blur()
      setTimeout(() => {
        pinInput.current.focus()
      }, durationInMiliseconds[timeoutCount])
    }
  }, [timeoutCount])

  const handleBioAuthenticate = async useFaceId => {
    // FACE ID ATTEMPTS STILL NEEDS TO BE FIGURED OUT
    // TRUST WALLET GIVES THEM TWO FACEID AND THEN THE PIN
    if (useFaceId) {
      const { success } = await LocalAuthentication.authenticateAsync()
      if (success) {
        onAuthenticate(true)
      } else {
        shakeView.current.shake()
        setUsePin(true)
      }
    }
  }

  const handleSubmit = () => {
    if (pin === "000000") {
      onAuthenticate(true)
    } else {
      shakeView.current.shake()
      setTimeout(() => {
        setPin("")
      }, 200)
      const nextAttempt = attempts - 1
      if (attempts === 0 || nextAttempt === 0) {
        setTimeoutCount(timeoutCount + 1)
      }
      if (attempts !== 0) {
        setAttempts(nextAttempt)
      }
    }
  }

  const pinText = timeoutCount
    ? `Try after ${userVisibleDuration[timeoutCount]}.`
    : attempts === 5
    ? "Enter Pin"
    : `Incorrect Pin.  You have ${attempts} attempts left!`
  return (
    <View style={$ROOT}>
      {usePin ? (
        <View style={$CONTENT}>
          <Text>{pinText}</Text>
          <ShakeView ref={shakeView}>
            <PinInput
              ref={pinInput}
              pin={pin}
              onChangeText={text => setPin(text)}
              onSubmit={handleSubmit}
            />
          </ShakeView>
        </View>
      ) : (
        <View style={$CONTENT}>
          <ShakeView ref={shakeView}>
            <Image source={{ uri: image }} />
          </ShakeView>
        </View>
      )}
    </View>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $CONTENT: ViewStyle = {
  alignItems: "center",
}
