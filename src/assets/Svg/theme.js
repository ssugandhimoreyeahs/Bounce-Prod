import React from 'react';
import {
    WhiteShare,
    BlackShare,
    WhiteMore,
    More,
    PenWhite,
    EditPen,
    BlackPen
} from './index';
import Theme from '../../app/themes';

const SVGS = {
    [Theme.themeTypes.LIGHT]: {
        Drawer_Edit: EditPen,
        Drawer_Share: BlackShare,
        Drawer_More: More
    },
    [Theme.themeTypes.DARK]: {
        Drawer_Edit: PenWhite,
        Drawer_Share: WhiteShare,
        Drawer_More: WhiteMore
    }
}

const RenderSVG = (props) => {
    let SVG = SVGS[props.themeType][props.svgFile];
    return <SVG {...props.svgProp} />
}

export default RenderSVG;