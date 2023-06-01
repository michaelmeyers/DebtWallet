import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, styles } from "app/theme"
import { Text } from "app/components/Text"

export interface MnemonicWordProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  mnemonicWord: string
  orderNumber?: number
  onPress?: () => void
  showWord?: boolean
}

/**
 * Describe your component here
 */
export const MnemonicWord = observer(function MnemonicWord ({
  mnemonicWord,
  orderNumber,
  onPress,
  showWord = true,
}: MnemonicWordProps) {
  const wordContainerAdditionalStyles: ViewStyle = {
    borderStyle: showWord ? "solid" : "dashed",
    // backgroundColor: showWord ? colors.blackBackground : "transparent",
    borderColor: showWord ? "transparent" : colors.text,
    borderWidth: 1,
    paddingHorizontal: orderNumber ? spacing.xxs : spacing.xs,
  }
  const $styles = [CONTAINER, wordContainerAdditionalStyles]
  const $wordStyle = [WORD_TEXT, { color: !showWord ? "black" : "tranparent" }]
  return (
    <Pressable style={$styles} onPress={onPress} disabled={!onPress}>
      <View style={styles.ROW}>
        {!!orderNumber && (
          <View style={NUMBER_VIEW}>
            <Text style={NUMBER_TEXT}>
              {orderNumber.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </Text>
          </View>
        )}
        <View style={WORD_VIEW}>
          <Text style={$wordStyle}>{mnemonicWord}</Text>
        </View>
      </View>
    </Pressable>
  )
})

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  paddingVertical: spacing.xxs,
  marginVertical: spacing.xxs,
  borderRadius: 5,
  marginHorizontal: spacing.xs,
  backgroundColor: "yellow",
  height: 35,
}

const NUMBER_VIEW: ViewStyle = {
  backgroundColor: "blue",
}

const NUMBER_TEXT: TextStyle = {
  textAlign: "right",
}

const WORD_VIEW: ViewStyle = {
  backgroundColor: "pink",
  paddingHorizontal: spacing.xxs,
}

const WORD_TEXT: TextStyle = {}
