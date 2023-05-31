import React, { useRef, useImperativeHandle, useMemo, useEffect } from "react"
import { View, ViewStyle, TextStyle, ViewProps, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"

export interface PinBoxProps {
  hasValue: boolean
}

const size = 15
export const PinBox = observer(function PinBox (props: PinBoxProps) {
  const { hasValue } = props
  return (
    <View style={$BOX}>
      <View style={hasValue ? $DOT : $LINE} />
    </View>
  )
})

const $BOX: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

const $DOT: ViewStyle = {
  height: size,
  width: size,
  borderRadius: Math.trunc(size / 2),
  backgroundColor: "black",
}

const $LINE: ViewStyle = {
  width: size,
  height: Math.trunc(size / 4),
  backgroundColor: "black",
}

export interface PinInputProps extends ViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onChangeText: (pin: string) => void
  onSubmit: () => void
  pin: string
}

/**
 * Describe your component here
 */
const maxLength = 6
export const PinInput = observer(
  React.forwardRef(function PinInput (props: PinInputProps, ref) {
    const { style, pin, onChangeText, onSubmit } = props
    const textInput = useRef<TextInput>()
    const $styles = [$CONTAINER, style]

    useEffect(() => {
      if (pin.length === maxLength) {
        onSubmit()
      }
    }, [pin])

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInput.current.focus()
      },
      blur: () => {
        textInput.current.blur()
      },
    }))

    const pinInputs = useMemo(() => {
      const digitsArray = pin.split("")
      const data = []
      for (let i = 0; i < maxLength; i++) {
        const letter = digitsArray?.[i]
        data.push(!!letter)
      }
      return data
    }, [pin])

    const handleChangeText = text => {
      if (text.length <= maxLength) {
        onChangeText(text)
      }
    }

    return (
      <View style={$styles}>
        <TextInput
          style={$INPUT}
          ref={textInput}
          onChangeText={handleChangeText}
          keyboardType='number-pad'
          value={pin}
        />
        <View style={$ROW}>
          {pinInputs.map((hasValue, index) => {
            return <PinBox hasValue={hasValue} key={index} />
          })}
        </View>
      </View>
    )
  }),
)

const $CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
}

const $INPUT: TextStyle = {
  display: "none",
}

const $ROW: ViewStyle = {
  flexDirection: "row",
  height: 40,
  width: 250,
  backgroundColor: "green",
}
