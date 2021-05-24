import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FONTSIZE, toCurrentTimeZone} from '@utils';
import moment from 'moment';
import dateFormat from 'dateformat';
import {RegexCollection} from '../../app/constants';
export default DatePicker = props => {
  const {
    handleChange = () => {},
    value,
    pickerMode,
    maximumDate,
    minimumDate,
    placeholder = '',
    errorMessage = '',
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => { 
    console.log('ON_DATE_SELECT - ', date);
    console.log("CUR_DATE - ' ", new Date());
    handleChange(date);
    hideDatePicker();
  };
  const getValue = () => {
    if (value && value instanceof Date) {
      let format = '';
      switch (pickerMode) {
        case 'date':
          format = RegexCollection.DateFormat;
          break;
        case 'datetime':
          format = RegexCollection.DateTimeFormat;
          break;
        case 'time':
          format = RegexCollection.TimeFormat;
          break;
      } 
      return moment(value).format(format);
    } else {
      return '';
    }
  };

  const getStartDate = () => {
    let startDate = moment();
    if (minimumDate && moment(minimumDate).isBefore(startDate)) {
      startDate = moment(minimumDate);
    }
    if (minimumDate && moment(minimumDate).isAfter(startDate)) {
      startDate = moment(minimumDate);
    }
    return startDate.toDate();
  };
  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          placeholderTextColor={'#696969'}
          placeholder={placeholder}
          style={[
            styles.textInput,
            errorMessage.length > 0 && {borderColor: 'red'},
          ]}
          value={getValue()}
          editable={false}></TextInput>
        {errorMessage?.length > 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTextStyle}>{errorMessage}</Text>
          </View>
        )}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={value}
        mode={pickerMode || 'datetime'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        isDarkModeEnabled={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    elevation: 2,
    height: 58,
    backgroundColor: '#fff',
    // borderColor: '#DDDDDD',
    borderRadius: 9.5,
    // borderWidth: 1,
    paddingLeft: 15,
    fontSize: FONTSIZE.Text14,
    marginTop: 10,
    color: '#000',
  },
  errorContainer: {
    marginTop: 5,
  },
  errorTextStyle: {
    color: 'red',
    marginLeft: 20,
  },
});
