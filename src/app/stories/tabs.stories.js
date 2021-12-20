import React, { useState } from 'react';
import { Tabs, TabContent } from 'ofd-ui-toolkit';

export default { title: 'Tabs' };

export const tabs = () => {
  const [ tabIndex, selectTab ] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={selectTab}>
      <TabContent label="TAB1">
        First tab content
      </TabContent>
      <TabContent label="TAB2">
        Secont tab content
      </TabContent>
      <TabContent label="TAB3">
        Third tab content
      </TabContent>
      <TabContent label="TAB4">
        Fourth tab content
      </TabContent>
      <TabContent label="TAB5">
        Fifth tab content
      </TabContent>
      <TabContent label="TAB6">
        Sixth tab content
      </TabContent>
    </Tabs>
  );
};
