export const getRequiredFields = (validationSchema) => {
  const fieldNames = Object.keys(validationSchema.describe().fields)
  
  const fields = Object.values(validationSchema.describe().fields).reduce((acc, curr, i) => {
    const isFieldRequired = !!curr.tests.filter((el) => el.name === 'required').length;
    acc[fieldNames[i]] = isFieldRequired;
    return acc;
  }, {})
  
  return fields;
};

export default getRequiredFields;
