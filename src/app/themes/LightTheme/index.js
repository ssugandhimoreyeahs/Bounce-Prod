import { DefaultTheme as LightPaperTheme, DarkTheme as DarkPaperTheme } from 'react-native-paper';
import { DefaultTheme as LightNavTheme, DarkTheme as DarkNavTheme } from '@react-navigation/native';
import LightThemeColors from './colors';
import ThemeTypes from '../themeTypes';




class LightTheme extends LightThemeColors { 
    typeId = 1;
    type = ThemeTypes.LIGHT;
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
                ...this.LightColors
            }
        });
    }
    serialize = () => {
        let theme = {type: this.type, theme: this};
        return JSON.stringify(theme);
    }
}
export default LightTheme;