import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, FlatList, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { LoadingButton, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { styles } from "app/theme"
import { SecureStore } from "app/models/SecureStore"

interface WalletsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Wallets">> {}

export const WalletsScreen: FC<WalletsScreenProps> = observer(function WalletsScreen () {
  // Pull in one of our MST stores
  const { walletStore } = useStores()
  const { wallets } = walletStore

  const handleDelete = wallet => {
    walletStore.deleteWallet(wallet)
  }

  const handleGetSecureStore = async () => {
    const addresses = wallets.map(({ address }) => address)
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      const savedDataForAddress = await SecureStore.getData(address)
      console.log(address, savedDataForAddress)
    }
  }

  const renderItem = ({ item: wallet }) => {
    return (
      <View>
        <Text>{wallet.address}</Text>
        <LoadingButton
          label='Delete'
          onPress={() => handleDelete(wallet)}
          containerStyle={{ height: 30, width: 100 }}
        />
      </View>
    )
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset='scroll'>
      <Text text='wallets' />
      <View style={styles.BUTTON}>
        <LoadingButton label='Get Data' onPress={handleGetSecureStore} />
      </View>
      <FlatList data={wallets} renderItem={renderItem} keyExtractor={({ address }) => address} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
