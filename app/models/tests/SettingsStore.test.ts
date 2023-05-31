import { SettingsStoreModel } from "../SettingsStore"

test("can be created", () => {
  const instance = SettingsStoreModel.create({})

  expect(instance).toBeTruthy()
})
