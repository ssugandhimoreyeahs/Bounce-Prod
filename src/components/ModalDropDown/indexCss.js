import { StyleSheet } from 'react-native';

const Style = () => {
    return StyleSheet.create({
        shadowStyle: {
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 5,
            shadowOpacity: 0.1,
            elevation:2,
            },
        textStyle: {
            fontSize: 20,
            color: 'black',
            marginLeft: 10,
        },
        dropDownStyle: {
            height: 50
        }
    });
}

export default Style;