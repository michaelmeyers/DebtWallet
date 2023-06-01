import React, { useEffect, useReducer } from "react"
import { Pressable, View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "../theme"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text } from "./Text"

interface SelectButtonProps {
  label: string
  onPress: () => void
  isSelected: boolean
}

export const SelectButton = observer(function SelectButton ({
  label,
  onPress,
  isSelected,
}: SelectButtonProps) {
  return (
    <Pressable
      style={[
        $CONTAINER,
        {
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? colors.text : colors.textGray,
        },
      ]}
      onPress={onPress}
    >
      <View style={$LABEL_VIEW}>
        <Text style={[$LABEL_TEXT, { color: isSelected ? colors.text : colors.textGray }]}>
          {label}
        </Text>
      </View>
      <View style={isSelected ? $CIRCLE_VIEW_SELECTED : $CIRCLE_VIEW_UNSELECTED}>
        {isSelected && (
          <FontAwesomeIcon icon={["fal", "check"]} color={colors.iconDark} size={20} />
        )}
      </View>
    </Pressable>
  )
})

const $CONTAINER: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  borderRadius: 10,
  alignItems: "center",
  padding: spacing[2],
  backgroundColor: colors.blackBackground,
}

const $CIRCLE_VIEW: ViewStyle = {
  height: 25,
  width: 25,
  borderRadius: 13,
  justifyContent: "center",
  alignItems: "center",
}

const $CIRCLE_VIEW_UNSELECTED: ViewStyle = {
  ...$CIRCLE_VIEW,
  borderColor: colors.text,
  borderWidth: 1,
}

const $CIRCLE_VIEW_SELECTED: ViewStyle = {
  ...$CIRCLE_VIEW,
  backgroundColor: colors.text,
}

const $LABEL_VIEW: ViewStyle = {
  flex: 1,
  paddingRight: spacing[2],
}

const $LABEL_TEXT: TextStyle = {}

const enum StatusKeys {
  lose = "lose",
  expose = "expose",
  responsibility = "responsibility",
}

export interface MnemonicAcknowledgementsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onStatusChange: (key, value) => void
  selectStatus
}

/**
 * Describe your component here
 */
export const MnemonicAcknowledgements = observer(function MnemonicAcknowledgements (
  props: MnemonicAcknowledgementsProps,
) {
  const { onStatusChange, selectStatus } = props

  const handleSelect = (key: string) => {
    onStatusChange(key, !selectStatus[key])
  }

  return (
    <View style={$CONTENT_VIEW}>
      <Text style={$INFO_TEXT}>
        {
          "ATTENTION: On the next page you will see your Mnemonic Phrase. If you lose your password this can give you access to your wallet again. Please write down your Mnemonic Phrase and Password."
        }
      </Text>
      <View style={$ICON_VIEW}>
        <FontAwesomeIcon icon={["fas", "user-secret"]} color={colors.icon} size={120} />
      </View>
      <View style={$BUTTONS_VIEW}>
        <View style={$BUTTON_CONTAINER}>
          <SelectButton
            label={"If I lose my mnemonic phrase and password, my funds will be lost forever."}
            onPress={() => handleSelect(StatusKeys.lose)}
            isSelected={selectStatus.lose}
          />
        </View>
        <View style={$BUTTON_CONTAINER}>
          <SelectButton
            label={"If I share or expose my mnemonic phrase to anybody, my funds can get stolen."}
            onPress={() => handleSelect(StatusKeys.expose)}
            isSelected={selectStatus.expose}
          />
        </View>
        <View style={$BUTTON_CONTAINER}>
          <SelectButton
            label={"It is my full responsibility to keep my mnemonic phrase and password secure."}
            onPress={() => handleSelect(StatusKeys.responsibility)}
            isSelected={selectStatus.responsibility}
          />
        </View>
      </View>
    </View>
  )
})

const $INFO_TEXT: TextStyle = {
  textAlign: "justify",
}

const $CONTENT_VIEW: ViewStyle = {
  paddingBottom: 130,
}

const $ICON_VIEW: ViewStyle = {
  paddingVertical: spacing[7],
  justifyContent: "center",
  alignItems: "center",
}

const $BUTTONS_VIEW: ViewStyle = {
  justifyContent: "space-between",
}

const $BUTTON_CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}
