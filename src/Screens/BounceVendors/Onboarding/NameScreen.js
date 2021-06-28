import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, CustomButton, ProgressCircle } from '@components';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchVendorData } from '../../../reducer/mainexpensecategory';
import { FONTSIZE, getHp, getWp } from '@utils';
import { ScrollView } from 'react-native';
import UserNameScreen from './UsernameScreen';
import { Scaffold } from '@components';
import { Toast } from '@constants';
import { useKeyboardStatus } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NameScreen(props) {
  const { navigation } = props;
  const [older, setOlder] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();


  const isKeyboardOpen = useKeyboardStatus();


  const handleSubmit = async () => {
    // console.log("FULL NAME-->",(`${firstName} `+`${lastName}`))
    if (firstName.length > 0 && lastName.length > 0) {
      navigation.navigate(UserNameScreen.routeName, {
        name: (`${firstName} `+`${lastName}`),
      });
    } else {
      Toast('Please enter your full name!');
    }
  };


  return (
    <Scaffold>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FBFBFB' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.HeadingStyle}>
            {'Enter your name'}
          </Text>

          <View style={{ marginTop: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder={'First'}
              placeholderTextColor="#999"
              style={styles.textInput}
              onChangeText={value => setFirstName(value)}
              value={firstName}
            />
            <TextInput
              placeholder={'Last'}
              placeholderTextColor="#999"
              style={styles.textInput}
              onChangeText={value => setLastName(value)}
              value={lastName}
            />
          </View>


          <View style={[styles.checkBoxStyle]}>
            <Checkbox
              onCheck={() => setOlder(!older)}
              isChecked={older}
            />
            <View>
              <Text style={[styles.textStyle]}>
                {'I am 13 years or older'}
              </Text>
            </View>
          </View>


          {/* <Text style={styles.HeadingStyle}>{'What’s your name? 👋'}</Text>
          <View style={{marginTop: 100}}>
            <TextInput
              placeholder={'Name'}
              placeholderTextColor="#999"
              style={styles.textInput}
              onChangeText={value => setName(value)}
              value={name}
            />
          </View> */}
          {!isKeyboardOpen && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignSelf: 'center',
              }}>
              {/* <CustomButton userContinue onPress={handleSubmit} /> */}


              <TouchableOpacity
                onPress={handleSubmit}
                style={{ backgroundColor: '#1A93FE', borderRadius: 20, paddingVertical: getHp(10), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.textStyle, {
                  color: '#fff',
                  fontFamily: 'AvenirNext-DemiBold'
                }]}>
                  {'Sync contacts and continue'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                style={{ paddingVertical: getHp(15), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.textStyle, {
                  fontSize: FONTSIZE.Text14,
                }]}>
                  {'Continue without syncing contacts'}
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </View>
      </ScrollView>
    </Scaffold>
  );
}
NameScreen.routeName = '/NameScreen';

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'AvenirNext-Medium',
    color: '#999999',
    fontSize: FONTSIZE.Text17,
  },
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
  },
  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHp(40),
    alignSelf: 'center',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-DemiBold',
    letterSpacing: 0.2,
    color: '#000',
    alignSelf: 'center',
    fontSize: FONTSIZE.Text22,
  },
  textInput: {
    textAlign: 'center',
    borderBottomColor: '#D2D2D4',
    borderBottomWidth: 1,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 10,
    width: '48%',
    color: '#000000',
  },
});
