// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

function DebtWalletApp () {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default DebtWalletApp
