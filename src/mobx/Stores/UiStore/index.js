import {runInAction, observable, action, makeAutoObservable} from 'mobx';
import ThemeFactory from '../../../app/themes';
import {LocalStorage} from '../../../app/utils/localStorage';
class UIStore {
  isThemeReady = false;
  rootStore;
  theme = ThemeFactory.getThemeOnType();
  constructor(rootStore) {
    makeAutoObservable(this, {
      theme: observable,
      isThemeReady: observable,
      initTheme: action,
      toggleTheme: action,
    });
    this.rootStore = rootStore;
    this.initTheme();
  }
  initTheme = async () => {
    try {
      const themeType = await LocalStorage.getTheme();
      this.theme = ThemeFactory.getThemeOnType(
        ThemeFactory.fromString(themeType),
      );
      this.isThemeReady = true;
    } catch (error) {
      this.isThemeReady = true;
      console.log('INIT_THEME - ', error);
    }
  };
  toggleTheme = () => {
    let themeType =
      this.theme.type == ThemeFactory.LIGHT
        ? ThemeFactory.DARK
        : ThemeFactory.LIGHT;
    this.theme = ThemeFactory.getThemeOnType(themeType);
    LocalStorage.setTheme(themeType.toString());
  };
}

export default UIStore;
