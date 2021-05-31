import {
  DefaultTheme as LightPaperTheme,
  DarkTheme as DarkPaperTheme,
} from 'react-native-paper';
import {
  DefaultTheme as LightNavTheme,
  DarkTheme as DarkNavTheme,
} from '@react-navigation/native';
import LightThemeColors from './colors';
import ThemeFactory from '../index';

class LightTheme extends LightThemeColors {
  typeId = 1;
  type = ThemeFactory.LIGHT;
  constructor() {
    super(); 
    this.initTheme();
  }
  initTheme = () => {
    Object.assign(this, {
      ...LightPaperTheme,
      ...LightNavTheme,
      colors: {
        ...LightPaperTheme.colors,
        ...LightNavTheme.colors,
        ...this.LightColors,
      },
    });
  };
  serialize = () => {
    let theme = {type: this.type, theme: this};
    return JSON.stringify(theme.theme);
  };
  get isLightTheme() {
    return true;
  }
}
export default LightTheme;
