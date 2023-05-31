import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, Pressable } from "react-native"
import { ShakeView, Text, LoadingButton } from "app/components"
import * as LocalAuthentication from "expo-local-authentication"
import { AuthTypes, useStores } from "app/models"
import { PinInput } from "app/components/PinInput"
import image from "../../ignite/templates/app-icon/ios-universal.png"
import { userVisibleDuration } from "app/utils/timeout"
import { useFocusEffect } from "@react-navigation/native"
import { spacing } from "app/theme"

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
  const shakeView = useRef()
  const pinInput = useRef()
  const [attempted, setAttempted] = useState(false)
  const [pin, setPin] = useState("")
  const [disabled, setDisabled] = useState(!!backoffDurationInMiliseconds)
  const [override, setOverride] = useState(false)

  useEffect(() => {
    if (disabled) {
      pinInput?.current?.blur()
    } else {
      pinInput?.current?.focus()
    }
  }, [disabled])

  useFocusEffect(
    React.useCallback(() => {
      setOverride(false)
      if (authType === AuthTypes.bio) {
        handleBioAuthenticate()
      }
      if (authType === AuthTypes.pin && !disabled) {
        pinInput?.current?.focus()
      }
    }, []),
  )

  useEffect(() => {
    if (backoffDurationInMiliseconds) {
      setDisabled(true)
      setTimeout(() => {
        setDisabled(false)
      }, backoffDurationInMiliseconds)
    }
  }, [backoffAttempts])

  const handleBioAuthenticate = async () => {
    const { success } = await LocalAuthentication.authenticateAsync()
    if (success) {
      onAuthenticate(true)
    } else {
      shakeView?.current?.shake()
      setTimeout(() => {
        setOverride(true)
      }, 200)
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
    pinInput?.current?.focus()
  }

  const attemptsText = backoffDurationInMiliseconds
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
      {override || authType === AuthTypes.pin ? (
        <View style={$CONTENT}>
          <Text>{attemptsText}</Text>
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
          <Text>{attemptsText}</Text>
          <ShakeView ref={shakeView}>
            <View style={{ height: 50, width: 50, backgroundColor: "pink" }} />
          </ShakeView>
        </View>
      )}
      <LoadingButton containerStyle={{ height: 50, width: 300 }} label='RESET' onPress={reset} />
      <LoadingButton
        containerStyle={{ height: 50, width: 300 }}
        label='AUTH'
        onPress={() => onAuthenticate(true)}
      />
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
