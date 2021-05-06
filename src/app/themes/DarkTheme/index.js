import { DarkTheme as DarkPaperTheme } from 'react-native-paper';
import { DarkTheme as DarkNavTheme } from '@react-navigation/native';
import DarkThemeColors from './colors';
import ThemeTypes from '../themeTypes';



class DarkTheme extends DarkThemeColors { 
    typeId = 2;
    type = ThemeTypes.DARK;
    constructor() {
        super();
        this.initTheme();
    }
    initTheme = () => {
        Object.assign(this, {
            ...DarkPaperTheme,
            ...DarkNavTheme,
            colors: {
                ...DarkPaperTheme.colors,
                ...DarkNavTheme.colors,
                ...this.DarkColors
            }
        });
    }
    serialize = () => {
        let theme = {type: this.type, theme: this};
        return JSON.stringify(theme);
    }
}
export default DarkTheme;