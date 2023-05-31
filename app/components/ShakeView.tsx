import React, { useImperativeHandle } from "react"
import { Animated, ViewStyle, ViewProps } from "react-native"
import { observer } from "mobx-react-lite"

export interface ShakeViewProps extends ViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
const shakeValue = 10
export const ShakeView = observer(
  React.forwardRef(function ShakeView (props: ShakeViewProps, ref) {
    const { style, children } = props
    const $styles = [$CONTAINER, style]
    const animation = React.useRef(new Animated.Value(0))

    useImperativeHandle(ref, () => ({
      shake () {
        Animated.loop(
          // runs the animation array in sequence
          Animated.sequence([
            // shift element to the left by 2 units
            Animated.timing(animation.current, {
              toValue: -shakeValue,
              duration: 50,
              useNativeDriver: false,
            }),
            // shift element to the right by 2 units
            Animated.timing(animation.current, {
              toValue: shakeValue,
              duration: 50,
              useNativeDriver: false,
            }),
            // bring the element back to its original position
            Animated.timing(animation.current, {
              toValue: 0,
              duration: 50,
              useNativeDriver: false,
            }),
          ]),
          // loops the above animation config 2 times
          { iterations: 2 },
        ).start()
      },
    }))

    return (
      <Animated.View style={[$styles, { transform: [{ translateX: animation.current }] }]}>
        {children}
      </Animated.View>
    )
  }),
)

const $CONTAINER: ViewStyle = {
  justifyContent: "center",
}
