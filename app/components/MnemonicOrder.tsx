import React, { useEffect, useReducer, useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, styles } from "app/theme"
import { Text } from "app/components/Text"
import { MnemonicWord } from "./MnemonicWord"
import R from "ramda"
import { isBlank, isPresent } from "app/utils/helpers"

export interface MnemonicOrderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  mnemonicPhrase: string
  onCorrectOrder: (isCorrect: boolean) => void
}

/**
 * Describe your component here
 */
const merge = (oldState, newState) => {
  const updatedState = Object.entries(newState).reduce((updated, [key, value]) => {
    if (!R.isNil(value) && typeof value === "object") {
      updated[key] = merge(oldState[key], value)
    } else {
      updated[key] = value
    }
    return updated
  }, oldState)
  return updatedState
}

const createIndexesByWord = (phrase: string, scrambledIndices) => {
  const wordArray = phrase.split(" ")
  return wordArray.reduce((acc, word, index) => {
    const correctIndex = index
    const scrambledIndex = scrambledIndices[index]
    const userInputIndex = null
    if (!acc[word]) {
      acc[word] = {
        word,
        correctIndices: [correctIndex],
        generatedIndices: {
          [scrambledIndex]: {
            scrambledIndex,
            userInputIndex,
          },
        },
      }
    } else {
      acc[word].correctIndices.push(correctIndex)
      acc[word].generatedIndices = {
        ...acc[word].generatedIndices,
        [scrambledIndex]: {
          scrambledIndex,
          userInputIndex,
        },
      }
    }
    return acc
  }, {})
}

const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

interface GeneratedIndices {}
interface IndexData {
  word: string
  correctIndices: string[]
  generatedIndices: GeneratedIndices
}

export const MnemonicOrder = observer(function MnemonicOrder (props: MnemonicOrderProps) {
  const { mnemonicPhrase, onCorrectOrder, style } = props
  const $styles = [CONTAINER, style]
  const scrambledIndices = indexArray
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  const [currentAssignableIndex, setCurrentAssignableIndex] = useState(0)
  const [indexesByWords, setIndexByWords] = useReducer((state, newState) => {
    const updatedState = merge(state, newState)
    return updatedState
  }, createIndexesByWord(mnemonicPhrase, scrambledIndices))

  const words = Object.values(indexesByWords).reduce((acc: [], wordData: IndexData) => {
    const { word, correctIndices, generatedIndices } = wordData
    const words = Object.values(generatedIndices).map(indices => {
      return { word, correctIndices, ...indices }
    })
    acc.push(...words)
    return acc
  }, [])
  const orderedWords = words
    .filter(({ userInputIndex }) => !R.isNil(userInputIndex))
    .sort((a, b) => a.userInputIndex - b.userInputIndex)
  const scrambledWords = words.sort((a, b) => a.scrambledIndex - b.scrambledIndex)

  const handleAssignIndex = (wordKey, scrambledIndex, userInputIndex) => {
    if (R.isNil(userInputIndex)) {
      const currentUserInputIndex =
        indexesByWords[wordKey].generatedIndices[scrambledIndex].userInputIndex
      const updatedIndexesByWord = Object.entries(indexesByWords).reduce(
        (updated, [key, value]) => {
          const updatedGeneratedIndices = Object.entries(value.generatedIndices).reduce(
            (updated, [key, value]) => {
              if (
                !R.isNil(value?.userInputIndex) &&
                value?.userInputIndex > currentUserInputIndex
              ) {
                updated[key] = {
                  userInputIndex: value?.userInputIndex - 1,
                  scrambledIndex: value?.scrambledIndex,
                }
              }
              return updated
            },
            value.generatedIndices,
          )
          updated[key] = {
            ...updated[key],
            generatedIndices: updatedGeneratedIndices,
          }
          return updated
        },
        {},
      )
      setIndexByWords(updatedIndexesByWord)
      setCurrentAssignableIndex(currentAssignableIndex - 1)
    } else {
      setCurrentAssignableIndex(currentAssignableIndex + 1)
    }
    setIndexByWords({ [wordKey]: { generatedIndices: { [scrambledIndex]: { userInputIndex } } } })
  }

  const isCorrectOrder = () => {
    if (isBlank(orderedWords)) {
      return false
    }
    return orderedWords.reduce((inOrder, wordData) => {
      const { correctIndices, userInputIndex } = wordData
      return inOrder && correctIndices.includes(userInputIndex)
    }, true)
  }

  const isCorrect = isCorrectOrder()

  useEffect(() => {
    onCorrectOrder(isCorrect)
  }, [isCorrect])

  return (
    <View style={$styles}>
      <View style={ORDERED_CONTAINER}>
        <View style={ORDERED_VIEW}>
          {orderedWords.map(({ word, scrambledIndex, userInputIndex }) => {
            return (
              <MnemonicWord
                key={scrambledIndex}
                mnemonicWord={word}
                onPress={() => handleAssignIndex(word, scrambledIndex, null)}
                orderNumber={userInputIndex + 1}
              />
            )
          })}
        </View>
        <View style={styles.ERROR_VIEW}>
          {isPresent(orderedWords) && !isCorrect && (
            <Text style={styles.ERROR_TEXT}>Wrong Order. Try Again</Text>
          )}
        </View>
      </View>
      <View style={WORD_VIEW}>
        {scrambledWords.map(({ word, scrambledIndex, userInputIndex }) => {
          return (
            <MnemonicWord
              key={scrambledIndex}
              mnemonicWord={word}
              onPress={
                R.isNil(userInputIndex)
                  ? () => handleAssignIndex(word, scrambledIndex, currentAssignableIndex)
                  : () => handleAssignIndex(word, scrambledIndex, null)
              }
              showWord={R.isNil(userInputIndex)}
            />
          )
        })}
      </View>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const ORDERED_CONTAINER: ViewStyle = {
  paddingVertical: spacing.md,
  alignItems: "center",
  paddingHorizontal: spacing.md,
  width: "100%",
}

const ORDERED_VIEW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.borderLight,
  padding: spacing.xxs,
  height: 240,
  width: "100%",
  justifyContent: "center",
}

const WORD_VIEW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
}
