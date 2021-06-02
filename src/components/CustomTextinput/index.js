import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { View, Text } from 'react-native';
import { FONTSIZE, getHp } from '@utils';

export default CustomTextinput = props => {
  const { text, multiline = true, onChange, value = '' } = props;
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
          height: getHp(110),
          textAlignVertical: 'top',
          color: 'black',
          fontFamily: 'AvenirNext-DemiBold',
          fontWeight: 'bold',
          fontSize: FONTSIZE.Text17,
        }}
      />

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
    height: getHp(161),
    paddingTop:5,
    paddingLeft:18,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 9.5,
    marginVertical: 10,
    // shadowColor: '#DCE4F9',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // shadowOpacity: 1,
    elevation: 2,
  },
  textStyle: {
    paddingLeft: 10,
    color: '#000',
    fontSize: FONTSIZE.Text15,
    backgroundColor: '#fff',
    fontFamily: 'AvenirNext-Regular',
    borderRadius: 9.5,
  },
});
