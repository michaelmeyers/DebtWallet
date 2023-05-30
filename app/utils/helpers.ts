import R from "ramda"
// import BigNumber from "bignumber.js"
// import jwtDecode from "jwt-decode"
// import moment from "moment"
// import { FeatureFlag, vBoxHostingCapacity } from "./constants"
// import { NftAttributeDisplayType } from "../models/nft-store/nft-store"
// import { colors } from "../theme"
// import remoteConfig from "@react-native-firebase/remote-config"
// import { Env } from "../models"
// import Config from "react-native-config"

export const isBlank = item => R.isNil(item) || R.isEmpty(item)
export const isPresent = item => !isBlank(item)

// export const convertToAtomicUnits = (units, decimals) => {
//   return new BigNumber(units).multipliedBy(Math.pow(10, decimals)).toFixed(0)
// }

// export const convertToUnits = (atomicUnits, decimals) => {
//   return new BigNumber(atomicUnits).dividedBy(Math.pow(10, decimals)).toFixed(decimals)
// }

// export const formatValueForDisplay = ({
//   value,
//   prefix = "",
//   suffix = "",
//   decimals = 0,
//   valueHidden = false,
// }) => {
//   if (valueHidden) {
//     return "-"
//   }
//   const validValue =
//     value === undefined || value === null || value === "NaN" || Number.isNaN(value) || value === ""
//       ? 0
//       : value
//   return `${prefix}${new BigNumber(validValue).toFormat(decimals)}${suffix}`
// }

// export const getTrueMax = (balance, tax, decimals, shouldSubtractOneAtomicUnit?) => {
//   const taxDivisor = new BigNumber(100 + tax).dividedBy(100)
//   const bigQuotient = new BigNumber(balance).dividedBy(taxDivisor)
//   const oneAtomicUnit = 1 / Math.pow(10, decimals)
//   return shouldSubtractOneAtomicUnit
//     ? bigQuotient.minus(oneAtomicUnit).toFixed(decimals, BigNumber.ROUND_DOWN)
//     : bigQuotient.toFixed(decimals, BigNumber.ROUND_DOWN)
// }

// export const mobxTransform = data => {
//   let transformedData
//   if (data === null || data === undefined) {
//     return data
//   }
//   switch (typeof data) {
//     case "string":
//     case "bigint":
//     case "boolean":
//     case "number":
//     case "function":
//       transformedData = data
//       break
//     case "object":
//       transformedData = Object.entries(data).reduce((object, [key, value]) => {
//         object[key] = mobxTransform(value)
//         return object
//       }, {})
//       break
//     default:
//       transformedData = data.reduce((arr, item) => {
//         arr.push(mobxTransform(item))
//         return arr
//       })
//       break
//   }
//   return transformedData
// }

// export const mobxLog = (message: string, state) => {
//   const transformedData = mobxTransform(state)
// }

// export interface TokenParse {
//   id: number
//   firstName: string
//   iat: number
//   lastName: string
//   roles: []
//   exp: number
//   authenticated: boolean
// }

// export const parseJWT = (token: string): TokenParse => {
//   return jwtDecode(token)
// }

// export const isJWTValid = token => {
//   const expired = isJWTExpired(token)
//   const authorized = isJWTAuthorized(token)
//   return !expired && authorized
// }

// export const isJWTExpired = (token: string) => {
//   try {
//     const { exp }: TokenParse = jwtDecode(token)
//     const now = moment().unix()
//     return exp < now
//   } catch (e) {
//     return false
//   }
// }

// export const isJWTAuthorized = token => {
//   const { authenticated }: TokenParse = jwtDecode(token)
//   return authenticated
// }

// export const isEven = n => n % 2 === 0

// export const getColorBetweenFromRatio = (toColor: string, fromColor: string, ratio: number) => {
//   var hex = function (x) {
//     x = x.toString(16)
//     return x.length == 1 ? "0" + x : x
//   }

//   const color1 = fromColor[0] === "#" ? fromColor.substring(1, 7) : fromColor
//   const color2 = toColor[0] === "#" ? toColor.substring(1, 7) : toColor

//   var r = Math.ceil(
//     parseInt(color1.substring(0, 2), 16) * ratio +
//       parseInt(color2.substring(0, 2), 16) * (1 - ratio),
//   )
//   var g = Math.ceil(
//     parseInt(color1.substring(2, 4), 16) * ratio +
//       parseInt(color2.substring(2, 4), 16) * (1 - ratio),
//   )
//   var b = Math.ceil(
//     parseInt(color1.substring(4, 6), 16) * ratio +
//       parseInt(color2.substring(4, 6), 16) * (1 - ratio),
//   )

//   return toColor[0] === "#" ? "#" + hex(r) + hex(g) + hex(b) : hex(r) + hex(g) + hex(b)
// }

// export const nFormatter = num => {
//   var si = [
//     { value: 1, symbol: "" },
//     { value: 1e3, symbol: "K" },
//     { value: 1e6, symbol: "M" },
//     { value: 1e9, symbol: "B" },
//     { value: 1e12, symbol: "t" },
//     { value: 1e15, symbol: "q" },
//     { value: 1e18, symbol: "Q" },
//     { value: 1e21, symbol: "s" },
//     { value: 1e24, symbol: "S" },
//   ]
//   var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
//   var i
//   // for negative value is work
//   for (i = si.length - 1; i > 0; i--) {
//     if (Math.abs(num) >= si[i].value) {
//       break
//     }
//   }
//   const numString = i === 1 ? (num / si[i].value).toString() : (num / si[i].value).toFixed(0)

//   return numString.replace(rx, "$1") + si[i].symbol
// }

// export const parseConfig = config => {
//   if (R.isNil(config)) {
//     return null
//   }
//   return JSON.parse(config)
// }

// export const calculateDaysLeft = (credits, licenseCount) => {
//   if (!licenseCount) {
//     return credits
//   }
//   return Math.trunc(credits / licenseCount)
// }

// export const getVBoxCoveredLicenseCount = (numberOfLicenese: number, numberOfVBoxes: number) => {
//   if (!numberOfVBoxes) {
//     return 0
//   }
//   const sum = numberOfLicenese - numberOfVBoxes * 20
//   return sum > 0 ? numberOfVBoxes * 20 : numberOfLicenese
// }

// export const getDaysLeftInTheMonth = date => {
//   const daysInMonth = moment(date).daysInMonth()
//   const daysConsumed = parseInt(moment(date).format("DD"))
//   const daysLeft = daysInMonth - daysConsumed
//   return daysLeft
// }

// export const timestampIsMoreThan5Mins = (startTimestamp, endTimeStamp) => {
//   if (!startTimestamp) {
//     return true
//   }
//   const startTimestampPlus5Mins = moment(startTimestamp).add(5, "minutes").toISOString()
//   return moment(endTimeStamp).isAfter(startTimestampPlus5Mins)
// }

// export const howManyDaysUntilDate = date => {
//   return moment(date).diff(moment().utc().format("MMM DD, YYYY"), "days")
// }

// interface cyclesCoveredParams {
//   credits: number
//   licenses: number
//   vboxes: number
//   now: moment.Moment
// }
// // FOR CYCLES ON MAIN PAGE
// export const getCyclesCovered = ({ credits, licenses, vboxes, now }: cyclesCoveredParams) => {
//   const vboxLicenses = vboxes * vBoxHostingCapacity
//   let day = now

//   let daysInMonth = day.daysInMonth() - day.date()
//   let cyclesCoveredInMonth = 0
//   let creditsLeft = credits
//   let daysInLastMonth = 0
//   let totalCycles = 0
//   while (cyclesCoveredInMonth === daysInLastMonth) {
//     // add what we would've vbox dropped if it's not the first pass
//     if (totalCycles !== 0) {
//       creditsLeft += daysInMonth * vboxLicenses
//     }

//     // if we have more than a years worth of cycles, just exit early
//     if (totalCycles > 365) {
//       return totalCycles
//     }

//     cyclesCoveredInMonth = getCyclesCoveredForMonth({
//       credits: creditsLeft,
//       licenses,
//       daysLeftInMonth: daysInMonth,
//     })
//     totalCycles += cyclesCoveredInMonth

//     // remove what we consumed this month
//     creditsLeft -= licenses * cyclesCoveredInMonth

//     daysInLastMonth = daysInMonth
//     // increment by 1 month
//     day = day.startOf("month").add(1, "month")
//     daysInMonth = day.daysInMonth()
//   }

//   return totalCycles
// }

// interface cyclesCoveredForMonthParams {
//   credits: number
//   licenses: number
//   daysLeftInMonth: number
// }
// // HELPER FUNCTION
// const getCyclesCoveredForMonth = ({
//   credits,
//   licenses,
//   daysLeftInMonth,
// }: cyclesCoveredForMonthParams) => {
//   const currentCyclesRemaining = Math.floor(credits / licenses)

//   if (currentCyclesRemaining <= daysLeftInMonth) {
//     return currentCyclesRemaining
//   }

//   return daysLeftInMonth
// }

// interface credCostParams {
//   credits: number
//   licenses: number
//   vboxes: number
//   now: moment.Moment
//   end: moment.Moment
// }

// // FOR TOTAL CREDITS TO CHARGE FOR PURCHASE SCREEN
// export const getCreditCost = ({ credits, licenses, vboxes, now, end }: credCostParams) => {
//   const vboxLicenses = vboxes * vBoxHostingCapacity
//   let day = now.clone()
//   let lastDay = now.clone()

//   let daysInMonth = day.daysInMonth() - day.date()
//   let creditCost = 0
//   let creditsNeededForMonth = 0
//   let creditsLeft = credits
//   let isFirstPass = true
//   while (!lastDay.isSame(end, "day")) {
//     // add what we would've vbox dropped if it's not the first pass
//     if (!isFirstPass) {
//       creditsLeft += daysInMonth * vboxLicenses
//     }
//     isFirstPass = false

//     creditsNeededForMonth = getCreditCostForMonth(licenses, daysInMonth)
//     const creditsNeeded = creditsLeft - creditsNeededForMonth
//     if (creditsNeeded < 0) {
//       creditCost += -creditsNeeded
//       creditsLeft = 0
//     } else {
//       creditsLeft -= creditsNeededForMonth
//     }

//     lastDay = day.clone().endOf("month")
//     // increment by 1 month
//     day = day.endOf("month").add(1, "month")
//     daysInMonth = day.daysInMonth()
//   }

//   return creditCost
// }

// // HELPER FUNCTION
// const getCreditCostForMonth = (licenses: number, daysLeftInMonth: number) => {
//   return licenses * daysLeftInMonth
// }

// export const formatPercentChange = percentChange => {
//   const color = percentTextColor(percentChange)
//   const symbol = percentSymbol(percentChange)
//   return { percentChange: new BigNumber(percentChange).absoluteValue().toString(), color, symbol }
// }
// export const percentTextColor = percentChange => {
//   const bigPercentChange = new BigNumber(percentChange)
//   return bigPercentChange.isEqualTo(0)
//     ? colors.textGray
//     : bigPercentChange.isLessThan(0)
//     ? colors.negative
//     : colors.positive
// }

// export const getPercentChange = (baseValue, comparisonValue) => {
//   const percentChange =
//     baseValue && comparisonValue
//       ? new BigNumber(comparisonValue)
//           .minus(baseValue)
//           .dividedBy(baseValue)
//           .multipliedBy(100)
//           .toString()
//       : "0"
//   return percentChange
// }

// export const percentSymbol = percentChange => {
//   const bigPercentChange = new BigNumber(percentChange)
//   return bigPercentChange.isEqualTo(0) ? "" : bigPercentChange.isLessThan(0) ? "-" : "+"
// }

// export const isFirstDayOfQuarter = () => {
//   const day = moment.utc().date()
//   const month = moment.utc().month()
//   return day === 1 && (month === 0 || month === 3 || month === 6 || month === 9)
// }

// export const findDecimals = (numberString: string): number => {
//   if (!numberString.includes(".")) {
//     return 0
//   }

//   return numberString.split(".")?.[1]?.length
// }

// export const nftFormatAttributeValue = (displayType, value): string | null => {
//   if (!displayType) {
//     return value
//   }
//   switch (displayType) {
//     case NftAttributeDisplayType.boostNumber:
//       return `${value}`
//     case NftAttributeDisplayType.boostPercentage:
//       return `${value}%`
//       break
//     case NftAttributeDisplayType.number:
//       const decimals = findDecimals(value)
//       return new BigNumber(value).toFormat(decimals)
//     case NftAttributeDisplayType.date:
//       return moment.unix(value).format("MMM DD, YYYY")
//     default:
//       return null
//   }
// }

// export const getNoSignificantBalanceByTokenKey = ({
//   tokenMigrationConfigs,
//   tokensByKey,
//   selectedIdWalletsByToken,
// }) => {
//   return tokenMigrationConfigs.reduce((acc, { v1TokenKey: tokenKey }) => {
//     const tokenWallet = selectedIdWalletsByToken?.[tokenKey]
//     const decimals = tokensByKey[tokenKey]?.decimals
//     if (!tokenWallet?.balance || !decimals) {
//       return acc
//     }
//     const balance = convertToUnits(tokenWallet.balance, decimals)
//     acc[tokenKey] = new BigNumber(balance).isLessThan(1)
//     return acc
//   }, {})
// }

// export const transformSnakeToCamel = string => {
//   const array = string.split("_")
//   const camel = array.reduce((key, word: string, index) => {
//     const lowerCaseWord = word.toLowerCase()
//     if (index !== 0) {
//       key += word[0] + lowerCaseWord.slice(1)
//     } else {
//       key += lowerCaseWord
//     }
//     return key
//   }, "")
//   return camel
// }

// export const getFeatureFlagForEnv = (key: FeatureFlag, env: Env): boolean => {
//   const json = remoteConfig().getValue(Config.REMOTE_CONFIG_FEATURE_FLAG_KEY).asString()
//   try {
//     const featureFlags = JSON.parse(json)
//     return featureFlags?.[key]?.[env.toUpperCase()]
//   } catch (error) {
//     return false
//   }
// }
