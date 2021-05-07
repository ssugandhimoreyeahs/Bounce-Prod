import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import { FONTSIZE, getHp, getWp } from '@utils'
// import CheckBox from 'react-native-check-box'
import { CheckBox } from 'react-native-elements'


export default Checkbox = ({ title }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                uncheckedColor={'#999999'}
                size={24}
            />
            {/* <Text style={styles.label}>{title}</Text> */}
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
        // flexDirection: "row",
        // marginVertical: 10,
    },
    checkbox: {
        // alignSelf: "center",
    },
    label: {
        marginLeft: getWp(10),
        fontSize: FONTSIZE.Text21,
        color: '#000'
    },
});
