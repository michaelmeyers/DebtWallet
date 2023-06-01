import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import moment from "moment"
import { durationInMiliseconds } from "../utils/durations"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    attempts: 0,
    backoffAttempts: 0,
    backoffStartTime: types.maybeNull(types.string),
    authenticatedAt: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views(self => {
    const views = {
      get backoffDurationInMiliseconds () {
        if (!self.backoffAttempts || !self.backoffStartTime) {
          return 0
        }
        const now = moment()
        const duration = durationInMiliseconds[self.backoffAttempts]
        const backoffEndTime = moment(self.backoffStartTime).add(duration, "milliseconds")
        const timeLeftInMiliseconds = moment(backoffEndTime).diff(now, "milliseconds")
        return timeLeftInMiliseconds
      },
    }
    return views
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    const setAttempts = attempts => {
      self.attempts = attempts
    }
    const incrementBackoff = () => {
      self.backoffAttempts = self.backoffAttempts + 1
      self.backoffStartTime = moment().toISOString()
    }
    const setBackoffAttempts = attempts => {
      self.backoffAttempts = attempts
    }
    const setBackoffStartTime = timestring => {
      self.backoffStartTime = timestring
    }
    const setAuthenticatedAt = timestring => {
      self.authenticatedAt = timestring
    }

    const reset = () => {
      self.attempts = 0
      self.backoffAttempts = 0
      self.backoffStartTime = null
    }
    return {
      setAttempts,
      incrementBackoff,
      setBackoffAttempts,
      setBackoffStartTime,
      setAuthenticatedAt,
      reset,
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
