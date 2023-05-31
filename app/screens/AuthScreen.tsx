import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, Pressable } from "react-native"
import { ShakeView, Text, LoadingButton } from "app/components"
import * as LocalAuthentication from "expo-local-authentication"
import { AuthTypes, useStores } from "app/models"
import { PinInput } from "app/components/PinInput"
import image from "../../ignite/templates/app-icon/ios-universal.png"
import { userVisibleDuration } from "app/utils/timeout"

interface AuthScreenProps {
  onAuthenticate: (auth: boolean) => void
}

const maxAttempts = 5
export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen ({
  onAuthenticate,
}: AuthScreenProps) {
  const { settingsStore, authStore } = useStores()
  const {
    attempts,
    backoffAttempts,
    backoffDurationInMiliseconds,
    setAttempts,
    incrementBackoff,
    reset,
  } = authStore
  const { appLock } = settingsStore || {}
  const { authType } = appLock
  const [usePin, setUsePin] = useState(authType === AuthTypes.pin)

  const shakeView = useRef()
  const pinInput = useRef()
  const [attempted, setAttempted] = useState(false)
  const [pin, setPin] = useState("")
  const [disabled, setDisabled] = useState(!!backoffDurationInMiliseconds)

  useEffect(() => {
    if (disabled) {
      console.log("BLURR")
      pinInput?.current?.blur()
    } else {
      console.log("FOCUS")
      pinInput?.current?.focus()
    }
  }, [disabled])

  useEffect(() => {
    if (authType === AuthTypes.bio) {
      handleBioAuthenticate(!usePin)
    }
    if (authType === AuthTypes.pin && !disabled) {
      console.log("FOCUS")
      pinInput?.current?.focus()
    }
  }, [usePin])

  useEffect(() => {
    if (backoffDurationInMiliseconds) {
      setDisabled(true)
      setTimeout(() => {
        setDisabled(false)
      }, backoffDurationInMiliseconds)
    }
  }, [backoffAttempts])

  const handleBioAuthenticate = async useFaceId => {
    // FACE ID ATTEMPTS STILL NEEDS TO BE FIGURED OUT
    // TRUST WALLET GIVES THEM TWO FACEID AND THEN THE PIN
    if (useFaceId) {
      const { success } = await LocalAuthentication.authenticateAsync()
      if (success) {
        onAuthenticate(true)
      } else {
        shakeView?.current?.shake()
        setUsePin(true)
      }
    }
  }

  const handleSubmit = () => {
    setAttempted(true)
    if (pin === "000000") {
      reset()
      onAuthenticate(true)
    } else {
      shakeView?.current?.shake()
      setTimeout(() => {
        setPin("")
      }, 200)
      setAttempts(attempts + 1)
      if (attempts >= maxAttempts - 1) {
        incrementBackoff()
      }
    }
  }

  const handleFocus = () => {
    if (usePin) {
      pinInput?.current?.focus()
    }
  }

  const pinText = backoffDurationInMiliseconds
    ? `Try after ${userVisibleDuration[backoffAttempts]}.`
    : !attempted
    ? "Enter Pin"
    : backoffAttempts
    ? `Try after ${userVisibleDuration[backoffAttempts]}.`
    : attempts
    ? `Incorrect Pin.  You have ${maxAttempts - attempts} attempts left!`
    : "Enter Pin"
  return (
    <Pressable style={$ROOT} onPress={handleFocus} disabled={disabled}>
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
            <View style={{ height: 50, width: 50, backgroundColor: "pink" }} />
          </ShakeView>
        </View>
      )}
      <LoadingButton containerStyle={{ height: 50, width: 300 }} label='RESET' onPress={reset} />
    </Pressable>
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
