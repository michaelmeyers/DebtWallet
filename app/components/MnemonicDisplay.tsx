import * as React from "react"
import { FlatList, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { MnemonicWord } from "./MnemonicWord"
import { styles } from "app/theme"

enum Orientation {
  horizontal = "horizontal",
  vertical = "vertical",
}

export interface MnemonicDisplayProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  mnemonicPhrase: string
  orientation: "horizontal" | "vertical"
}

/**
 * Describe your component here
 */
export const MnemonicDisplay = observer(function MnemonicDisplay (props: MnemonicDisplayProps) {
  const { mnemonicPhrase, orientation } = props

  const renderItem = ({ item, index }) => {
    const { word, orderNumber } = item
    return (
      <View style={styles.FLEX}>
        <MnemonicWord key={index} mnemonicWord={word} orderNumber={orderNumber} />
      </View>
    )
  }

  if (!mnemonicPhrase) {
    return null
  }
  let mnemonicWords = []
  if (orientation === Orientation.vertical) {
    const arrayOfWords = mnemonicPhrase.split(" ")
    const middleIndex = arrayOfWords.length / 2
    const firstSix = arrayOfWords.slice(0, middleIndex)
    const lastSix = arrayOfWords.slice(middleIndex, arrayOfWords.length)
    const reorderedWords = firstSix.reduce((acc, word, index) => {
      const orderNumber = index + 1
      acc.push({ word, orderNumber })
      acc.push({ word: lastSix[index], orderNumber: orderNumber + middleIndex })
      return acc
    }, [])
    mnemonicWords = reorderedWords
  } else {
    const arrayOfWords = mnemonicPhrase.split(" ")
    mnemonicWords = arrayOfWords.map((word, index) => {
      return { word, orderNumber: index + 1 }
    })
  }
  return (
    <View style={PHRASE_CONTAINER}>
      <FlatList
        contentContainerStyle={FLATLIST_CONTAINER}
        data={mnemonicWords}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  )
})

const PHRASE_CONTAINER: ViewStyle = {
  flex: 1,
}

const FLATLIST_CONTAINER: ViewStyle = {
  width: "75%",
  backgroundColor: "green",
  alignSelf: "center",
}
