import React, { useState } from 'react';
import Checkbox from 'ofd-ui-toolkit';

export default { title: 'Checkbox' };

export const checkbox = () => {
  const [ isChecked, setIsChecked ] = useState(false);

  return (
    <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
  );
};
