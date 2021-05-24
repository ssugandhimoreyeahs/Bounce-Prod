import React from 'react';
import {
  WhiteShare,
  BlackOutlineShare,
  WhiteMore,
  More,
  PenWhite,
  EditPen,
  BlackPen,
} from './index';
import ThemeFactory from '../../app/themes';

const SVGS = {
  [ThemeFactory.LIGHT]: {
    Drawer_Edit: EditPen,
    Drawer_Share: BlackOutlineShare,
    Drawer_More: More,
  },
  [ThemeFactory.DARK]: {
    Drawer_Edit: PenWhite,
    Drawer_Share: WhiteShare,
    Drawer_More: WhiteMore,
  },
};

const RenderSVG = props => {
  let SVG = SVGS[props.themeType][props.svgFile];
  return <SVG {...props.svgProp} />;
};

export default RenderSVG;
