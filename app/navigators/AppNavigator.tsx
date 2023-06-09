/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { AppState, useColorScheme, Modal } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors, styles } from "app/theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useStores } from "app/models"
import moment from "moment"
import { BlockchainWallet } from "app/services/api/blockchain"

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
  Settings: undefined
}
export type AppStackParamList = {
  // 🔥 Your screens go here
  color: undefined
  wallet: undefined
  walletImport: undefined
  walletAdd: undefined
  wallets: undefined
  settings: undefined
  securitySettings: undefined
  mnemonicAcknowledgements: undefined
  mnemonic: undefined
  mnemonicOrder: { blockchainWallet: BlockchainWallet }
  AddWallet: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AuthStackParamList = {
  AddWallet: undefined
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
const ColorsNav = createNativeStackNavigator<AppStackParamList>()
const ColorsStack = observer(function AppStack () {
  return (
    <ColorsNav.Navigator screenOptions={{ navigationBarColor: colors.background }}>
      <ColorsNav.Screen name='color' component={Screens.ColorScreen} />
    </ColorsNav.Navigator>
  )
})

const SettingsNav = createNativeStackNavigator<AppStackParamList>()
const SettingsStack = observer(function SettingsStack () {
  return (
    <SettingsNav.Navigator
      initialRouteName='settings'
      screenOptions={{ navigationBarColor: colors.background }}
    >
      <SettingsNav.Screen name='settings' component={Screens.SettingsScreen} />
      <SettingsNav.Screen name='securitySettings' component={Screens.SecuritySettingsScreen} />
    </SettingsNav.Navigator>
  )
})

const AddWalletNav = createNativeStackNavigator<AppStackParamList>()
const AddWalletStack = observer(function AppStack () {
  return (
    <AddWalletNav.Navigator
      initialRouteName='walletAdd'
      screenOptions={{ navigationBarColor: colors.background }}
    >
      <AddWalletNav.Screen name='walletAdd' component={Screens.AddWalletScreen} />
      <AddWalletNav.Screen name='walletImport' component={Screens.WalletImportScreen} />
      <AddWalletNav.Screen name='mnemonic' component={Screens.MnemonicScreen} />
      <AddWalletNav.Screen name='mnemonicOrder' component={Screens.MnemonicOrderScreen} />
      <AddWalletNav.Screen
        name='mnemonicAcknowledgements'
        component={Screens.MnemonicAcknowledgementsScreen}
      />
    </AddWalletNav.Navigator>
  )
})

const WalletsNav = createNativeStackNavigator<AppStackParamList>()
const WalletsStack = observer(function AppStack () {
  return (
    <WalletsNav.Navigator screenOptions={{ navigationBarColor: colors.background }}>
      <WalletsNav.Screen name='wallet' component={Screens.WalletScreen} />
      <WalletsNav.Screen
        options={{ presentation: "modal", headerShown: false }}
        name='AddWallet'
        component={AddWalletStack}
      />
      <WalletsNav.Screen name='wallets' component={Screens.WalletsScreen} />
    </WalletsNav.Navigator>
  )
})

const TabNav = createBottomTabNavigator<TabStackParamList>()
const TabStack = observer(function AppStack () {
  return (
    <TabNav.Navigator screenOptions={{ headerShown: false }}>
      <TabNav.Screen name='Wallets' component={WalletsStack} />
      <TabNav.Screen name='Colors' component={ColorsStack} />
      <TabNav.Screen name='Settings' component={SettingsStack} />
    </TabNav.Navigator>
  )
})

const SetupNav = createNativeStackNavigator<AuthStackParamList>()
const SetupStack = observer(function SetupStack () {
  return (
    <SetupNav.Navigator>
      <SetupNav.Screen
        options={{ headerShown: false }}
        name={"AddWallet"}
        component={AddWalletStack}
      />
    </SetupNav.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator (props: NavigationProps) {
  const colorScheme = useColorScheme()
  const { walletStore, settingsStore, authStore } = useStores()
  const { selectedWalletAddress } = walletStore
  const { appLock } = settingsStore
  const { authenticatedAt, setAuthenticatedAt } = authStore
  const [authenticated, setAuthenticated] = useState(false)
  useBackButtonHandler(routeName => exitRoutes.includes(routeName))

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        setTimeout(() => {
          setAuthenticated(false)
        }, 500)
      }
      if (nextAppState === "active") {
        if (
          appLock.validationTimer &&
          authenticatedAt &&
          moment().diff(authenticatedAt, "milliseconds") < appLock.validationTimer
        ) {
          setAuthenticated(true)
        }
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  const handleAuthenticate = auth => {
    setAuthenticated(auth)
    if (auth) {
      setAuthenticatedAt(moment().toISOString())
    }
  }

  const lock = appLock.enable && !!selectedWalletAddress && !authenticated
  const AppStack = selectedWalletAddress ? <TabStack /> : <SetupStack />
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Modal visible={lock} style={styles.FLEX}>
        <Screens.AuthScreen onAuthenticate={handleAuthenticate} />
      </Modal>
      {AppStack}
    </NavigationContainer>
  )
})
