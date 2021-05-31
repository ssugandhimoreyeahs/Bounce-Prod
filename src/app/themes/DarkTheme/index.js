import { DarkTheme as DarkPaperTheme } from 'react-native-paper';
import { DarkTheme as DarkNavTheme } from '@react-navigation/native';
import DarkThemeColors from './colors';
import ThemeFactory from '../index';



class DarkTheme extends DarkThemeColors { 
    typeId = 2;
    type = ThemeFactory.DARK;
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
        return JSON.stringify(theme.theme);
    }
    get isDarkTheme() {
        return true;
    }
}
export default DarkTheme;