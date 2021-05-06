import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FONTSIZE } from '@utils'
import moment from 'moment';

export default DatePicker = ({ birthday, setBirthday, tillToday }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var currentDate = moment(date).format("DD/MM/YYYY");
        console.log("currentDate", currentDate);
        // console.warn("A date has been picked: ", date);
        setBirthday(currentDate)
        hideDatePicker();
    };

    return (
        <View>
            {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    placeholder="Birthday"
                    style={styles.textInput}
                    onChangeText={(value) => setBirthday(value)}
                    // onFocus={() => showDatePicker()}
                    editable={false}
                    value={`${birthday}`}
                />
            </TouchableOpacity>
            {/* {showDatePicker} */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}

            />
        </View>
    );
};
const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#1FAEF7',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000'
    },
})