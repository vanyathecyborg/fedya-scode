import React, { useState } from 'react';
import Input from 'ofd-ui-toolkit';

export default { title: 'Input' };

export const defaultInput = () => (
  <Input />
);

export const withTypeNumber = () => (
  <Input type="number" />
);

export const withPlaceholder = () => (
  <Input placeholder="Type here..." />
);

export const withOnchange = () => {
  const [ text, setText ] = useState('');

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Input onChange={handleOnChange} />
      <br />
      <span>{text}</span>
    </>
  );
};

export const withOnfocus = () => {
  const [ text, setText ] = useState('');

  const handleOnFocus = (e) => {
    setText(`Focused with: ${e.target.value}`);
  };

  return (
    <>
      <Input onFocus={handleOnFocus} />
      <br />
      <span>{text}</span>
    </>
  );
};

export const withOnblur = () => {
  const [ text, setText ] = useState('');

  const handleOnBlur = (e) => {
    setText(`Blured with: ${e.target.value}`);
  };

  return (
    <>
      <Input onBlur={handleOnBlur} />
      <br />
      <span>{text}</span>
    </>
  );
};
