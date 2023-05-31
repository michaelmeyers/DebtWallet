import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SettingsStoreModel, AuthStoreModel, WalletsStoreModel } from "../models"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  settingsStore: types.optional(SettingsStoreModel, {} as any),
  walletStore: types.optional(WalletsStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
