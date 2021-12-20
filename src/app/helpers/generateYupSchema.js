import * as Yup from 'yup';

const generateYupSchema = (inputsList) => {
  const schema = inputsList.reduce((acc, { yup = null, key }) => {
    if (yup) {
      acc[key] = yup;
    }
    return acc;
  }, {});

  return Yup.object(schema);
}

export default generateYupSchema;
