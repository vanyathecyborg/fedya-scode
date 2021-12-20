export const maxLength = (max) => `Поле должно содержать не более ${max} символов`;
export const minLength = (min) => `Поле должно содержать не менее ${min} символов`;
export const required = (msg) => msg || 'Поле должно быть заполнено';

export const length = (count) => (value) => (value && value.length !== count ? `Поле должно содержать ${count} символов` : undefined);

export const oneOfLength = (counts, isDigits = false) => (value) => (
  value && Array.isArray(counts) && !counts.some((el) => el === value.length)
    // eslint-disable-next-line no-return-assign
    ? `Поле должно содержать ${counts.reduce((acc, curr, i) => (i === 0 ? acc += curr : acc += ` или ${curr}`), '')} ${isDigits ? 'цифр' : 'символов'}`
    : undefined
);

export const betweenLength = (min, max, isDigits = false) => (value) => (
  value && (value.length < min || value.length > max)
    ? `Поле должно содержать от ${min} до ${max} ${isDigits ? 'цифр' : 'символов'}`
    : ''
);

export const isNumber = (value) => {
  return /^\d*$/.test(value) ? undefined : 'Поле должно содержать только цифры';
};

export const isEmail = (value) => {
  const regex = /\S+@\S+\.\S+/;

  return regex.test(value)
    ? undefined
    : 'Неккоректный адрес эл. почты';
};

export const noRussian = (value) => {
  const regex = /[А-Яа-я]/;

  return regex.test(value)
    ? 'Поле не должно содержать кириллицу'
    : undefined;
};

export const noSpaces = (value) => {
  const spacesRegex = /\s/g;
  return spacesRegex.test(value)
    ? 'Поле не должно содержать пробелы'
    : undefined;
};
