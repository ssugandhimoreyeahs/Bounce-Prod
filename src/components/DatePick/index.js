import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FONTSIZE } from '@utils'
import moment from 'moment';

export default DatePicker = ({ birthday, setBirthday, tillToday }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const [date, setDate] = useState('');
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var currentDate = moment(date).format("DD/MM/YYYY");
        console.log("currentDate", currentDate);
        setBirthday(currentDate)
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    placeholder='Date / Time'
                    style={styles.textInput}
                    onChangeText={(value) => setBirthday(value)}
                    onFocus={() => showDatePicker()}
                    editable={false}
                    value={`${birthday}`}
                >
                </TextInput>
            </TouchableOpacity>
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
        borderColor: '#DDDDDD',
        borderRadius: 9.5,
        borderWidth: 1,
        paddingLeft: 15,
        fontSize: FONTSIZE.Text17,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000'
    },
})