import * as ExpoSecureStore from "expo-secure-store"

export enum SecureStoreKey {
  pin = "PIN",
}

const getData = async key => {
  try {
    const data = await ExpoSecureStore.getItemAsync(key)
    return data
  } catch (error) {
    console.error("Data couldn't be accessed!", error)
  }
}

const saveData = async (key, value) => {
  try {
    await ExpoSecureStore.setItemAsync(key, value)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const deleteData = async key => {
  try {
    await ExpoSecureStore.deleteItemAsync(key)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const SecureStore = {
  getData,
  saveData,
  deleteData,
}
