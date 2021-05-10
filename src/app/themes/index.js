import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';
import ThemeTypes from './themeTypes';
class ThemeFactory extends ThemeTypes {
  getThemeOnType = (type = undefined) => {
    let theme;
    if (type == undefined) {
      return new LightTheme();
    }
    switch (type) {
      case this.DARK:
        theme = new DarkTheme();
        break;
      case this.LIGHT:
        theme = new LightTheme();
        break;
      default:
        theme = new LightTheme();
    }
    return Object.assign({}, theme);
  };
}
export default new ThemeFactory();
