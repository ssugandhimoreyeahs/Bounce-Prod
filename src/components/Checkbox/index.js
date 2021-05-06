import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { FONTSIZE, getHp, getWp } from '@utils'
// import CheckBox from 'react-native-check-box'

export default Checkbox = ({ title }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: '#1FAEF7', false: '#696969' }}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
            {/* <CheckBox
                style={{ flex: 1, paddingVertical:10 }}
                onClick={() => setToggleCheckBox(!toggleCheckBox)}
                isChecked={toggleCheckBox}
                // leftText={"CheckBox"}
                uncheckedCheckBoxColor={"#696969"}
                rightText={title}
                rightTextStyle={styles.label}
            /> */}
            <Text style={styles.label}>{title}</Text>
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
        flexDirection: "row",
        marginVertical: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        marginLeft: getWp(10),
        fontSize: FONTSIZE.Text21,
        color: '#000'
    },
});
