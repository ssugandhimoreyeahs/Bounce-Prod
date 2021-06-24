import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import { FONTSIZE, getHp, getWp } from '@utils'
// import CheckBox from 'react-native-check-box'
import { CheckBox } from 'react-native-elements'


export default Checkbox = ({ onCheck, isChecked }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    // const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                onPress={onCheck}
                style={styles.checkbox}
                uncheckedColor={'#999999'}
                checkedColor={'#1FAEF7'}
                size={24}
                checked={isChecked}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
    },
    checkbox: {
    },
    label: {
        marginLeft: getWp(10),
        fontSize: FONTSIZE.Text21,
        color: '#000'
    },
});
