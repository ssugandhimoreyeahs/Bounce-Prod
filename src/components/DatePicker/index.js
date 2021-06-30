import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FONTSIZE } from '@utils';
import moment from 'moment';

export default DatePicker = ({ birthday, setBirthday, tillToday }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthday(date);
    hideDatePicker();
  };
  

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          pointerEvents="none"
          placeholder={'Birthday'}
          style={styles.textInput}
          onChangeText={value => setBirthday(value)}
          editable={false}
          value={`${birthday}`}
        />
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
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    color: '#000'
  },
})
