import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { styles } from "app/theme"

enum Contracts {
  alum = "0x3988f8ff5Fb5340446a3d0EC40A02298c9BB7c0c",
  grow = "0xc4F68B5e69a495C20253562E7ce88fBf67B5B23c",
}

interface WalletScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Wallet">> {}

export const WalletScreen: FC<WalletScreenProps> = observer(function WalletScreen () {
  // Pull in navigation via hook
  const navigation = useNavigation()
  // Pull in one of our MST stores
  const { walletStore } = useStores()
  const { selectedWalletAddress, walletsByAddress } = walletStore
  const selectedWallet = walletsByAddress?.[selectedWalletAddress]
  const [balance, setBalance] = useState(0)

  const handleNavToCreateWallet = () => {
    navigation.navigate("AddWallet")
  }

  const handleNavToWallets = () => {
    navigation.navigate("wallets")
  }

  const handleGetBalance = async (networkName, tokenKey) => {
    const contractAddress = Contracts?.[tokenKey]
    const contractBalance = await walletStore.getContractBalanceForWallet(
      contractAddress,
      selectedWalletAddress,
      networkName,
    )
    setBalance(contractBalance)
  }

  const handleWalletBalance = async () => {
    const gasBalance = await walletStore.getGasBalance(selectedWalletAddress, "testnet")
    setBalance(gasBalance)
  }
  return (
    <Screen style={$ROOT} preset='scroll'>
      <Text text='Selected Wallet' />
      <Text>{selectedWallet.nickname}</Text>
      <Text>{selectedWallet.address}</Text>
      <Text>{`Balance: ${balance}`}</Text>
      <View style={$SPACER_VIEW}>
        <LoadingButton
          containerStyle={styles.BUTTON}
          label='Add Wallet'
          onPress={handleNavToCreateWallet}
        />
      </View>
      <View style={$SPACER_VIEW}>
        <LoadingButton
          containerStyle={styles.BUTTON}
          label='All Wallets'
          onPress={handleNavToWallets}
        />
      </View>
      <View style={$SPACER_VIEW}>
        <LoadingButton
          containerStyle={styles.BUTTON}
          label='Grow Balance'
          onPress={() => handleGetBalance("testnet", "grow")}
        />
      </View>
      <View style={$SPACER_VIEW}>
        <LoadingButton
          containerStyle={styles.BUTTON}
          label='Alum Balance'
          onPress={() => handleGetBalance("testnet", "alum")}
        />
      </View>
      <View style={$SPACER_VIEW}>
        <LoadingButton
          containerStyle={styles.BUTTON}
          label='BNB Balance'
          onPress={handleWalletBalance}
        />
      </View>
    </Screen>
  )
})

const $ROOT: ViewStyle = {
  flex: 1,
}

const $SPACER_VIEW: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-around",
}
