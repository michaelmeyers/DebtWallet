import { TextStyle, ViewStyle } from "react-native/types"

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
  width: 250,
  backgroundColor: "green",
}

const FOOTER_VIEW: ViewStyle = {
  height: 90,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}

const ERROR_VIEW: ViewStyle = {
  height: 40,
  alignItems: "center",
  alignSelf: "flex-end",
  justifyContent: "center",
}

const ERROR_TEXT: TextStyle = {
  color: "red",
}

export const styles = {
  FLEX,
  FLEX_CENTERED,
  ROW,
  BUTTON,
  FOOTER_VIEW,
  ERROR_TEXT,
  ERROR_VIEW,
}
