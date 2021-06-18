import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FONTSIZE, getHp, getWp, toCurrentTimeZone } from '@utils';
import moment from 'moment';
import dateFormat from 'dateformat';
import { RegexCollection } from '../../app/constants';
export default DatePicker = props => {
  const {
    handleChange = () => { },
    value,
    pickerMode,
    maximumDate,
    minimumDate,
    placeholder = '',
    errorMessage = '',
    createEvent = false,
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
    <View style={styles.shadowStyle}>

      <TouchableOpacity onPress={showDatePicker}>
        {createEvent ?
          <>
            <Text style={{
              color: '#696969',
              fontSize: FONTSIZE.Text14,
              fontFamily: 'AvenirNext-Regular',
              position: 'absolute',
              left: 15,
              zIndex: 1,
              top: 5,
              borderRadius: 9.5
            }}>{placeholder}</Text>
            <TextInput
              pointerEvents="none"
              textAlignVertical='bottom'

              style={[
                styles.textInput, {
                  elevation: 0,
                  marginTop: 5,
                  backgroundColor: '#fff',
                  // fontFamily: 'AvenirNext-Regular',
                },
                errorMessage.length > 0 && {
                  borderColor: 'red',
                },
              ]}
              value={getValue()}
              editable={false} />
          </>
          :
          <TextInput
            pointerEvents="none"
            placeholderTextColor={'#000'}
            placeholder={placeholder}
            style={[
              styles.textInput,
              errorMessage.length > 0 && { borderColor: 'red' },
            ]}
            value={getValue()}
            editable={false} />
        }


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
      // isDarkModeEnabled={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 13,
    marginVertical: 8
  },
  textInput: {
    height: getHp(60), //orginal 60
    backgroundColor: '#fff',
    borderRadius: 9.5,
    fontFamily: 'AvenirNext-Medium',
    paddingLeft: 15,
    // fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    color: '#000',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.2,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  errorContainer: {
    marginTop: 5,
  },
  errorTextStyle: {
    color: 'red',
    marginLeft: 20,
  },
});
