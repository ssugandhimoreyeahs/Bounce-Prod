import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Root, CustomButton, ProgressCircle } from '@components';
import { FONTSIZE, getHp, getWp, validateEmail, validatePass, smallHitSlop } from '@utils';
import { postData } from '../../../FetchServices';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVendorData } from '../../../reducer/mainexpensecategory';
import BirthDayScreen from './BirthDayScreen';
import EmailScreen from './EmailScreen.js';
import { ApiClient } from '../../../app/services';
import { Scaffold } from '@components';
import { Toast } from '@constants';
import { useKeyboardStatus } from '@hooks';
import { BlueEye, GreyEye } from '@svg';


export default function UserNameScreen(props) {
  const { navigation } = props;
  const { name } = props.route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const isKeyboardOpen = useKeyboardStatus();

  const handleSubmit = async () => {
    try {
      if (username.length == 0) {
        return Toast('Username is required!');
      }
      if (password.length == 0) {
        return Toast('Password is required!');
      }
      if (password.length < 7) {
        return Toast('Password should be 8 characters long !');
      }

      let body = {
        vendorType: '2',
        name,
        username: username,
        password: password,
      };

      // let validateP = await validatePass(password);
      // if (!validateP) {
      //   console.log('values res of pass', validateP);
      //   Toast(
      //     'Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter !',
      //   );
      // } else
      if (username.length > 0 && password.length > 7) {
        setLoader(true);
        const res = await ApiClient.instance.post(
          ApiClient.endPoints.validateVendor,
          body,
        );

        if (res.statusCode !== 404) {
          dispatch(fetchVendorData(['FIRST_PAGE', body]));
          setLoader(false);
          navigation.navigate(EmailScreen.routeName, {
            username: username,
            password: password,
            name,
          });
        } else if (res.statusCode == 404) {
          setLoader(false);
          Toast(res.message);
        }
      } else {
        setLoader(false);
        Toast("Please fill all the field's with valid data !");
      }
    } catch (error) {
      Toast('User already exist');
      console.log(error);
    }
  };

  const handleSpace = (value, type = 'Username') => {
    let regSpace = new RegExp(/\s/);
    if (regSpace.test(value)) {
      if (type == 'Password') {
        setPassword(value.trim())
      } else {
        setUsername(value.trim())
      }
      Toast(`${type} ` + "cannot contain space !");
    } else {
      if (type == 'Password') {
        setPassword(value)
      } else {
        setUsername(value)
      }
    }
  }



  return (
    <Scaffold>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#FBFBFB' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.HeadingStyle}>{'Pick a username! 😜'}</Text>

          <View style={{ marginTop: 100 }}>
            <TextInput
              placeholder="@Username"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={username}
              onChangeText={value => handleSpace(value, 'Username')}
            />
            <Text style={styles.infoText}>
              {'You won’t be able to change it!'}
            </Text>
          </View>

          <View style={[styles.textInput, { marginVertical: 10, flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              style={[{
                fontSize: FONTSIZE.Text22,
                fontFamily: 'AvenirNext-Medium',
                marginTop: 10,
                color: '#000', width: '90%'
              }]}
              value={password}
              secureTextEntry={!passwordVisible}
              onChangeText={value => handleSpace(value, 'Password')}
            />
            {passwordVisible ?
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} hitSlop={smallHitSlop} >
                <BlueEye height={getHp(20)} width={getWp(20)} style={{ marginRight: getWp(15) }} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} hitSlop={smallHitSlop} >
                <GreyEye height={getHp(20)} width={getWp(20)} style={{ marginRight: getWp(15) }} />
              </TouchableOpacity>

            }
          </View>

          {!isKeyboardOpen && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignSelf: 'center',
              }}>
              <ProgressCircle
                currentProgress={2}
                containerStyle={{ marginBottom: 20 }}
              />
              <CustomButton userContinue onPress={handleSubmit} />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
}
UserNameScreen.routeName = '/UserNameScreen';

const styles = StyleSheet.create({
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: 10
  },
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  textInput: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 10,
    color: '#000'
  },
})
