import React from 'react';
import Tooltip from 'ofd-ui-toolkit';

export default { title: 'Tooltip' };

export const tooltip = () => (
  <Tooltip text="Tooltip text message here">
    <span>Hover me</span>
  </Tooltip>
);
