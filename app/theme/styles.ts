import { ViewStyle } from "react-native/types"

const FLEX: ViewStyle = {
  flex: 1,
}

const FLEX_CENTERED: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const ROW: ViewStyle = {
  flexDirection: "row",
}

const BUTTON: ViewStyle = {
  height: 50,
}

export const styles = {
  FLEX,
  FLEX_CENTERED,
  ROW,
  BUTTON,
}
