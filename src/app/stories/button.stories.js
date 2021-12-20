import React from 'react';
import Button from 'ofd-ui-toolkit';

import { css } from 'styled-components';

const extendStyle = css`
  background: red;
  color: white;
  font-size: 40px;

  &:not(:disabled) {
    &:active {
      background-color: rebeccapurple;
    }
  }
`;

export default { title: 'Button' };

export const defaultButton = () => <Button>Default button</Button>;

export const yellowColor = () => (
  <Button color="yellow">
    Click me!
  </Button>
);

export const whiteColor = () => (
  <Button color="white">
    Click me!
  </Button>
);

export const disabled = () => (
  <Button disabled>
    Click me!
  </Button>
);

export const disabledWhite = () => (
  <Button color="white" disabled>
    Click me!
  </Button>
);

export const extendStyled = () => (
  <Button extendStyle={extendStyle}>
    Click me!
  </Button>
);
