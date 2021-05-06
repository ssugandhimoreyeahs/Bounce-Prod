import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';
import ThemeTypes from './themeTypes';
class Themes {
    themeTypes = {
        LIGHT: ThemeTypes.LIGHT,
        DARK: ThemeTypes.DARK,
    } 
    getThemeOnType = (type = undefined) => {
        let theme;
        if (type == undefined) {
            return new LightTheme();
        }
        switch (type) {
            case this.themeTypes.DARK:
                theme = new DarkTheme();
                break;
            case this.themeTypes.LIGHT:
                theme = new LightTheme();
                break;
            default:
                theme = new LightTheme();
        };
        return Object.assign({}, theme);
    }
}
export default new Themes(); 