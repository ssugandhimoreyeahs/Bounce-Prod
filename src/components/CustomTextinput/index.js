import React from 'react';
import {TouchableOpacity, StyleSheet, TextInput, Keyboard} from 'react-native';
import {View, Text} from 'react-native';
import {FONTSIZE, getHp} from '@utils';

export default CustomTextinput = props => {
  const {text, multiline = true, onChange, value = ''} = props;
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#696969',
          fontWeight: '400',
          fontSize: FONTSIZE.Text15,
        }}>
        {text}
      </Text>

      <TextInput
        multiline={multiline}
        value={value}
        onChangeText={onChange}
        style={{
          marginTop: getHp(3),
          height: getHp(100),
          textAlignVertical: 'top',
          color: 'black',

          fontFamily: 'AvenirNext-DemiBold',
          fontWeight: 'bold',
          fontSize: FONTSIZE.Text17,
        }}
      />
      {/* <TextInput
                placeholder={text}
                placeholderTextColor={"#000"}
                style={[styles.textStyle, { textAlignVertical: multiline ? 'top' : 'auto' }]}
                multiline={multiline}
                numberOfLines={multiline ? 9 : null}
                editable={false}
            />
            <View style={{ position: 'absolute', top: 40, left: 10, right: 10, width: '90%', marginBottom: 10, borderRadius: 9.5 }}>
                <TextInput
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={"#696969"}
                    style={[styles.TextInputStyle, multiline && { height: getHp(40) },{backgroundColor: '#fff', textAlignVertical: multiline ? 'top' : 'auto' }]}
                    multiline={multiline}
                    numberOfLines={multiline ? 5 : null}
                    
                />
            </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  TextInputStyle: {
    height: 110,
    marginTop: -10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-DemiBold',
  },
  container: {
    padding: getHp(12),
    width: '97%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#DCE4F9',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
  },
  textStyle: {
    paddingLeft: 10,
    // opacity: 0.9,
    color: '#000',
    fontSize: FONTSIZE.Text15,
    // lineHeight: 20,
    // letterSpacing: 0.5,
    backgroundColor: '#fff',
    fontFamily: 'AvenirNext-Regular',
    borderRadius: 10,
  },
});
