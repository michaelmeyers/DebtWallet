import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { isBlank } from "app/utils/helpers"
import { SecureStore } from "app/models/SecureStore"

export const WalletModel = types
  .model("Wallet", {
    nickname: types.string,
    address: types.string,
  })
  .actions(self => {
    const setNickname = nickname => {
      self.nickname = nickname
    }
    return {
      setNickname,
    }
  })
export interface Wallet extends Instance<typeof WalletModel> {}

/**
 * Model description here for TypeScript hints.
 */
export const WalletsStoreModel = types
  .model("WalletsStore")
  .props({
    wallets: types.array(WalletModel),
    selectedWalletAddress: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views(self => {
    const views = {
      get walletsByAddress () {
        if (isBlank(self.wallets)) {
          return {}
        }
        return self.wallets.reduce((acc, wallet) => {
          acc[wallet.address] = wallet
          return acc
        }, {})
      },
      get walletNicknames () {
        if (isBlank(self.wallets)) {
          return []
        }
        return self.wallets.map(({ nickname }) => nickname)
      },
      get nextWalletNickname () {
        if (isBlank(views.walletNicknames)) {
          return "Wallet 1"
        }
        let count = 1
        while (views.walletNicknames.includes(`Wallet ${count}`)) {
          count++
        }
        return `Wallet ${count}`
      },
    }
    return views
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    const addWallet = (wallet: Wallet) => {
      try {
        self.wallets.push(wallet)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
    const removeWallet = (wallet: Wallet) => {
      try {
        self.wallets.remove(wallet)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
    const saveWallet = async (mnemonic, address, userNickname?) => {
      try {
        const nickname = userNickname || self.nextWalletNickname
        const wallet = { nickname, address }
        const saved = addWallet(wallet)
        if (saved) {
          await SecureStore.save({ address, mnemonic })
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
    return {
      addWallet,
      removeWallet,
      saveWallet,
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface WalletsStore extends Instance<typeof WalletsStoreModel> {}
export interface WalletsStoreSnapshotOut extends SnapshotOut<typeof WalletsStoreModel> {}
export interface WalletsStoreSnapshotIn extends SnapshotIn<typeof WalletsStoreModel> {}
export const createWalletsStoreDefaultModel = () => types.optional(WalletsStoreModel, {})
