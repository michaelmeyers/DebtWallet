import moment from "moment"
import { AuthStoreModel } from "../AuthStore"

test("can be created", () => {
  const instance = AuthStoreModel.create({
    attempts: 5,
    backoffAttempts: 5,
    backoffStartTime: moment().toISOString(),
  })

  const { backoffDurationInMiliseconds } = instance
  expect(backoffDurationInMiliseconds).toBeTruthy()
})
