import { maxLength } from "./validation";

export const digitsAndLetters = (value) => value.replace(/[^A-Za-zА-Яа-я0-9_ ]/g, '');

export const lettersOnly = (value) => value.replace(/[^A-Za-zА-Яа-я]/g, '');
export const engLettersOnly = (value) => value.replace(/[^a-zA-Z]/g, '');
export const uppercaseOnly = (value) => value.toUpperCase();

export const russianLettersSpaceAndHyphenOnly = (value) => value.replace(/[^\-/а-яА-ЯёЁ\s]/gi, '');
export const russianLettersAndHyphenOnly = (value) => value.replace(/[^\-/а-яА-ЯёЁ]/gi, '');

export const digitsOnly = (value) => value.replace(/[^0-9]/g, '');

export const noDoubleWhitespace = (value) => value.replace(/ {2}/g, ' ').replace(/^ /g, '');

export const regexOnly = (regex, value) => value.replace(regex, '');

export const regex = (regex, value, maxLength, replace) => {
  const valueToReplace = replace
    ? replace
    : maxLength
      ? value.slice(0, maxLength)
      : '';
  let transformedValue = value;
  console.log('before', transformedValue)
  transformedValue = transformedValue.replace(regex, valueToReplace);
  console.log('after', transformedValue)
  if (maxLength && value.length > maxLength) {
    transformedValue = transformedValue.slice(0, maxLength)
  }
  return transformedValue;
}

export const maxLengthFilter = (maxLength, value) => value.slice(0, maxLength);
