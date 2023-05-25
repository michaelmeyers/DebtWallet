import React, { useState } from "react"
import { TextStyle, View, ViewStyle, Pressable, ActivityIndicator, Keyboard } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "../theme"
import { Text } from "./"
import FontAwesome from "@fortawesome/react-native-fontawesome"

const waitTimeBeforeButtonIsEnabledAgain = 500
const enum ButtonEnumType {
  solid = "solid",
  outline = "outline",
  clear = "clear",
}

export interface LoadingButtonProps {
  onPress: (any?) => void
  containerStyle?: ViewStyle
  label: string
  labelStyle?: TextStyle
  iconName: Array<string>
  iconContainerStyle?: ViewStyle
  type?: "solid" | "outline" | "clear"
  color?: string
  disabled?: boolean
  loading?: boolean
  iconRight?: boolean
  changeBackgroundOnDisable?: boolean
}

export const LoadingButton = observer(function LoadingButton (props: LoadingButtonProps) {
  const {
    containerStyle,
    label,
    labelStyle,
    iconName,
    iconContainerStyle,
    onPress,
    type = ButtonEnumType.solid,
    color = colors.icon,
    disabled = false,
    loading = false,
    iconRight = false,
    changeBackgroundOnDisable = true,
  } = props

  const styles = {
    container: {
      default: {
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      },
      solid: {
        borderWidth: 0,
        backgroundColor: color,
      },
      outline: {
        borderWidth: 1,
        borderColor: color,
      },
      clear: {
        borderWidth: 0,
        backgroundColor: colors.transparent,
      },
      disabled: {
        solid: {
          backgroundColor: colors.disabled,
        },
        outline: {
          borderColor: colors.disabledDark,
        },
        clear: {
          backgroundColor: color,
        },
      },
    },
    text: {
      default: {
        fontSize: 14,
        flexWrap: "wrap",
        textAlign: "center",
      },
      solid: {
        color: colors.textBlack,
      },
      outline: {
        color,
      },
      clear: {
        color,
      },
      disabled: {
        color: colors.disabledDark,
      },
    },
  }

  const [disableForDoublePress, setDisableForDoublePress] = useState(false)

  const handleOnPress = () => {
    setDisableForDoublePress(true)
    Keyboard.dismiss()
    onPress()
    setTimeout(() => {
      setDisableForDoublePress(false)
    }, waitTimeBeforeButtonIsEnabledAgain)
  }

  const createContainerAndTextStylesFromType = buttonType => {
    let container = {
      ...styles.container.default,
      ...styles.container[buttonType],
      ...containerStyle,
    }
    let text = {
      ...styles.text.default,
      ...styles.text[buttonType],
      ...labelStyle,
    }
    if (disabled) {
      if (changeBackgroundOnDisable) {
        container = {
          ...container,
          ...styles.container.disabled[buttonType],
        }
      }
      text = {
        ...text,
        ...styles.text.disabled,
      }
    }
    return { container, text }
  }

  const { container, text } = createContainerAndTextStylesFromType(type)
  const indicatorColor = type === ButtonEnumType.solid ? "black" : color

  return (
    <View style={container}>
      <Pressable
        accessibilityLabel='Pressable'
        onPress={handleOnPress}
        style={$PRESSABLE_VIEW}
        disabled={loading || disableForDoublePress || disabled}
      >
        {loading && (
          <ActivityIndicator accessibilityLabel='ActivityIndicator' color={indicatorColor} />
        )}
        {!loading && (
          <View accessibilityLabel='View' style={$LABEL_VIEW}>
            {iconName && !!label && (
              <View
                accessibilityLabel='View'
                style={[iconContainerStyle, { paddingRight: spacing[3] }]}
              >
                {!iconRight && <FontAwesome name={iconName} />}
              </View>
            )}
            {label && (
              <Text accessibilityLabel='Text' style={text}>
                {label}
              </Text>
            )}
            {iconName && !!label && (
              <View
                accessibilityLabel='View'
                style={[iconContainerStyle, { paddingLeft: spacing[3] }]}
              >
                {iconRight && <FontAwesome name={iconName} />}
              </View>
            )}
          </View>
        )}
      </Pressable>
    </View>
  )
})

const $PRESSABLE_VIEW: ViewStyle = {
  height: "100%",
  width: "100%",
  justifyContent: "center",
}

const $LABEL_VIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}
