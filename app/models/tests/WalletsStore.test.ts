import { WalletsStoreModel } from "../WalletsStore"

test("can be created", () => {
  const instance = WalletsStoreModel.create({})

  expect(instance).toBeTruthy()
})
