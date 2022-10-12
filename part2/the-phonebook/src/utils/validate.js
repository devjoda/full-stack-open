import {formatNumber} from './format'

const lengthIsGreaterThan = (number, minLength, errorMessage) => {
  return new Promise((resolve, reject) => {
    const formattedNumber = formatNumber(number)
    if (formattedNumber.length >= minLength) {
      resolve(true)
    } else {
      reject(errorMessage)
    }
  })
}

const numberIsNumeric = (number, errorMessage) => {
  return new Promise((resolve, reject) => {
    const formattedNumber = formatNumber(number)
    if (formattedNumber.match(/^[0-9]+$/) !== null) {
      resolve(false)
    } else {
      reject(errorMessage)
    }
  })
}

const arrayDoesNotContainObjectWithProperty = (
  array,
  property,
  compareString,
  errorMessage,
) => {
  return new Promise((resolve, reject) => {
    const isDuplicate = array.some(
      o => o[`${property}`].toLowerCase() === compareString.toLowerCase(),
    )
    if (isDuplicate) {
      reject(errorMessage)
    } else {
      resolve(true)
    }
  })
}

const stringIsNotEmpty = (string, errorMessage) => {
  return new Promise((resolve, reject) => {
    if (string.length > 0) {
      resolve(true)
    } else {
      reject(errorMessage)
    }
  })
}

export {
  lengthIsGreaterThan,
  numberIsNumeric,
  arrayDoesNotContainObjectWithProperty,
  stringIsNotEmpty,
}
