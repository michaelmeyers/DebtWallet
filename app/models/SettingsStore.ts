import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export enum AuthTypes {
  pin = "PIN",
  bio = "BIO",
}

/**
 * Model description here for TypeScript hints.
 */
export const SettingModel = types
  .model("Setting", {
    enable: types.boolean,
    groupId: types.string,
    label: types.string,
  })
  .actions(self => {
    const update = (key, value) => {
      self[key] = value
    }
    return {
      update,
    }
  })

export const AppLockSettingModel = types.model("AppLock", {
  validationTimer: types.number,
  authType: types.enumeration([AuthTypes.pin, AuthTypes.bio]),
})

export interface AppLockSetting extends Instance<typeof AppLockSettingModel> {}

export const SettingsStoreModel = types
  .model("SettingsStore")
  .props({
    appLock: types.optional(types.compose(AppLockSettingModel, SettingModel), {
      enable: true,
      validationTimer: 0,
      authType: AuthTypes.pin,
      groupId: "Security",
      label: "Security",
    }),
  })
  .actions(withSetPropAction)
  .views(self => {
    const views = {
      get settings () {
        return Object.entries(self).map(([key, value]) => {
          return {
            key,
            ...value,
          }
        })
      },
      get settingsByLabel () {
        return Object.entries(self).map(([key, value]) => {
          return {
            key,
            ...value,
          }
        })
      },
    }
    return views
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsStoreDefaultModel = () => types.optional(SettingsStoreModel, {})
