import React, {useEffect, useState} from 'react';

import MobxStore from '../../../mobx';

const useTheme = props => {
  const [theme, setTheme] = useState(MobxStore.uiStore.theme);

  useEffect(() => {
    setTheme(MobxStore.uiStore.theme);
  }, [MobxStore.uiStore.theme]);

  return theme;
};

export default useTheme;
