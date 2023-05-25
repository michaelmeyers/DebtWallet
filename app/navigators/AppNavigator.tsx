/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { View, useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabStackParamList = {
  Wallets: undefined
  Colors: undefined
}
export type AppStackParamList = {
  // 🔥 Your screens go here
  Color: undefined
  Wallet: undefined
  WalletInput: undefined
  CreateWallet: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const ColorStack = createNativeStackNavigator<AppStackParamList>()
const ColorsNav = observer(function AppStack () {
  return (
    <ColorStack.Navigator screenOptions={{ navigationBarColor: colors.background }}>
      <ColorStack.Screen name='Color' component={Screens.ColorScreen} />
    </ColorStack.Navigator>
  )
})
const WalletsStack = createNativeStackNavigator<AppStackParamList>()
const WalletsNav = observer(function AppStack () {
  return (
    <WalletsStack.Navigator screenOptions={{ navigationBarColor: colors.background }}>
      <WalletsStack.Screen name='Wallet' component={Screens.WalletScreen} />
      <WalletsStack.Screen name='WalletInput' component={Screens.WalletInputScreen} />
      <WalletsStack.Screen name='CreateWallet' component={Screens.CreateWalletScreen} />
    </WalletsStack.Navigator>
  )
})
const TabStack = createBottomTabNavigator<TabStackParamList>()

const AppStack = observer(function AppStack () {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name='Wallets' component={WalletsNav} />
      <TabStack.Screen name='Colors' component={ColorsNav} />
    </TabStack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator (props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler(routeName => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})

const GREEN_SCREEN = {
  flex: 1,
  backgroundColor: "green",
}
