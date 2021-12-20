import React, { useState } from 'react';
import Popup from 'ofd-ui-toolkit';

import { css } from 'styled-components';

const extendStyle = css`
  background: red;
  color: white;
`;

export default { title: 'Popup' };

export const defaultPopup = () => {
  const [ isOpened, setIsOpened ] = useState(false);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={() => setIsOpened(!isOpened)}>{isOpened ? 'Close' : 'Open'}</button>
      <Popup isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <h1>Popup content</h1>
      </Popup>
    </div>
  );
};

export const styledPopup = () => {
  const [ isOpened, setIsOpened ] = useState(false);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={() => setIsOpened(!isOpened)}>{isOpened ? 'Close' : 'Open'}</button>
      <Popup isOpen={isOpened} onClose={() => setIsOpened(false)} bodyStyle={extendStyle}>
        <h1>Popup content</h1>
      </Popup>
    </div>
  );
};
