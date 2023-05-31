import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import moment from "moment.js"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    attempts: 0,
    backoffAttempts: 0,
    backoffStartTime: types.string,
  })
  .actions(withSetPropAction)
  .views(self => {
    const views = {
      get backoffDurationInMiliseconds () {
        if (!self.backoffAttempts || !self.backoffStartTime) {
          return 0
        }
        return
      },
    }
    return views
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    const setAttempts = attempts => {
      self.attempts = attempts
    }
    const setBackoffAttempts = attempts => {
      self.backoffAttempts = attempts
    }
    const setBackoffStartTime = timestring => {
      self.backoffStartTime = timestring
    }

    return {
      setAttempts,
      setBackoffAttempts,
      setBackoffStartTime,
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
