import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WalletsStoreModel } from "./WalletsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
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
