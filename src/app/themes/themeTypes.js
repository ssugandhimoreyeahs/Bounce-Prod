class ThemeTypes {
  DARK = Symbol('DARK');
  LIGHT = Symbol('LIGHT');

  fromString = type => {
    if (this.DARK.toString() == String(type)) {
      return this.DARK;
    } else {
      return this.LIGHT;
    }
  };
}

export default ThemeTypes;
