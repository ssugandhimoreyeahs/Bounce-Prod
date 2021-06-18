import { StyleSheet } from 'react-native';
import { FONTSIZE, getHp } from '../../app/utils';

const Style = () => {
    return StyleSheet.create({
        shadowStyle: {
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 5,
            shadowOpacity: 0.1,
            elevation: 2,
        },
        textStyle: {
            fontSize: FONTSIZE.Text20,
            color: 'black',
            marginLeft: 10,
        },
        dropDownStyle: {
            height: getHp(50)
        }
    });
}

export default Style;