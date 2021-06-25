import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { View, Text } from 'react-native';
import { FONTSIZE, getHp, getWp } from '@utils';

export default CustomTextinput = props => {
  const {
    text,
    multiline = true,
    onChange,
    value = '',
    custom,
    createEvent = false
  } = props;
  return (
    <>
      {
        custom ?
          (
            <View style={styles.container1}>
              <Text
                style={{
                  marginTop: getHp(5),
                  opacity: 0.5,
                  color: '#000',
                  fontSize: FONTSIZE.Text15,
                  fontFamily: 'AvenirNext-Medium',
                }}>
                {text}
              </Text>
              <TextInput
                multiline={multiline}
                value={value}
                onChangeText={onChange}
                style={{
                  marginTop: getHp(0),
                  height: getHp(110),
                  textAlignVertical: 'top',
                  color: 'black',
                  paddingRight: getWp(8),
                  fontFamily: 'AvenirNext-Medium',
                  fontSize: FONTSIZE.Text17,
                }}
              />
            </View>
          )
          :
          createEvent ?
            (
              <View style={[styles.container, { height: getHp(140), borderRadius: 13 }]}>
                <Text
                  style={{
                    color: '#696969',
                    fontWeight: '400',
                    fontSize: FONTSIZE.Text15,
                    marginTop: getHp(5),
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {text}
                </Text>
                <TextInput
                  placeholderTextColor={"#696969"}
                  multiline={multiline}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    // marginTop: getHp(3),
                    height: getHp(90),
                    textAlignVertical: 'top',
                    color: 'black',
                    backgroundColor: '#fff',
                    borderRadius: 13,
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text17,
                  }}
                />
              </View>
            )
            :
            (
              <View style={styles.container}>
                <Text
                  style={{
                    // backgroundColor:'red',
                    color: '#999999',
                    fontWeight: '400',
                    fontSize: FONTSIZE.Text15,
                    marginTop: getHp(5),
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {text}
                </Text>
                <TextInput
                  multiline={multiline}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    // backgroundColor:'blue',
                    marginTop: getHp(0),
                    height: getHp(110),
                    textAlignVertical: 'top',
                    color: 'black',
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text17,
                  }}
                />
              </View>
            )
      }
    </>
  );
};
const styles = StyleSheet.create({
  TextInputStyle: {
    height: getHp(110),
    marginTop: getHp(-10),
    color: '#000',
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-DemiBold',
  },
  container: {
    height: getHp(161),
    paddingTop: getHp(5),
    paddingLeft: getWp(18),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 9.5,
    marginVertical: getHp(10),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  container1: {
    height: getHp(161),
    paddingTop: getHp(5),
    paddingLeft: getWp(18),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 9.5,
    marginVertical: getHp(3),
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
  },
  textStyle: {
    paddingLeft: getWp(10),
    color: '#000',
    fontSize: FONTSIZE.Text15,
    backgroundColor: '#fff',
    fontFamily: 'AvenirNext-Regular',
    borderRadius: 9.5,
  },
});
