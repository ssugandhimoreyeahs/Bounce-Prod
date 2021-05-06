import { runInAction, observable, action, makeAutoObservable } from 'mobx';
import Themes from '../../../app/themes';
import { LocalStorage } from '../../../app/utils/localStorage';
class UIStore {
    isThemeReady = false;
    rootStore;
    theme = Themes.getThemeOnType();
    constructor(rootStore) {
        makeAutoObservable(this, {
            theme: observable,
            isThemeReady: observable,
            initTheme: action,
            toggleTheme: action
        });
        this.rootStore = rootStore;
        this.initTheme();
    }
    initTheme = async () => {
        try {
            const themeType = await LocalStorage.getTheme();
            this.theme = Themes.getThemeOnType(themeType);
            this.isThemeReady = true;
        } catch (error) {
            this.isThemeReady = true;
            console.log("INIT_THEME - ", error);
        }
    }
    toggleTheme = () => {
        let themeType = this.theme.type == Themes.themeTypes.LIGHT ? Themes.themeTypes.DARK : Themes.themeTypes.LIGHT;
        this.theme = Themes.getThemeOnType(themeType);
        LocalStorage.setTheme(themeType);
    }
}

export default UIStore;