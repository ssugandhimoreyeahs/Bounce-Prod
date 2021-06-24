import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import {
  CustomButton,
  Checkbox,
  Header
} from '@components';
import { connect, useSelector, useDispatch } from 'react-redux';
import { FONTSIZE, getHp, getWp } from '@utils';
import { ScrollView } from 'react-native';
import { Scaffold } from '@components';
import { Toast } from '@constants';
import { ApiClient } from '@bounceServices';
import { useKeyboardStatus } from '@hooks';

export default function ForgotPassword(props) {
  const { navigation } = props;
  const [username, setUserName] = useState('');
  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const dispatch = useDispatch();
  const isKeyboardOpen = useKeyboardStatus();

  const handleSubmit = async () => {
    let forgotPasswordResponse;
    try {
      const body = {
        username: username,
      };
      forgotPasswordResponse = await ApiClient.instance.post(
        ApiClient.endPoints.forgotPassword,
        body,
      );
      Promise.resolve(forgotPasswordResponse);
      console.log('forgot password response --> ', forgotPasswordResponse.data);
      Alert.alert('Message', forgotPasswordResponse.data.message, [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Promise.reject(error);
      console.log('error --> ', error.response?.data);
      Alert.alert('Oops..', error.response?.data.message, [
        {
          text: 'Ok',
          // onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <Scaffold>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FBFBFB' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Header
          headerBackColor={{ paddingBottom: getHp(20), backgroundColor: '#FBFBFB' }}
          back
          headerStyleProp={{ fontFamily: 'AvenirNext-DemiBold', }}
          headerTitle={"Forgot Something?"}
          onPress={() => props.navigation.goBack()}
        />
        <View style={styles.container}>

          <View style={styles.checkBoxStyle}>
            <Checkbox
              onCheck={() => setCheckUsername(!checkUsername)}
              isChecked={checkUsername}
            />
            <View>
              <Text style={styles.textStyle}>
                {'Find Username'}
              </Text>
              <Text style={[styles.textStyle, {
                color: '#999999', fontSize: FONTSIZE.Text15,
              }]}>
                {'Enter your email to get your username.'}
              </Text>
            </View>
          </View>

          <View style={[styles.checkBoxStyle, { marginTop: getHp(10) }]}>
            <Checkbox
              onCheck={() => setCheckPassword(!checkPassword)}
              isChecked={checkPassword}
            />
            <View>
              <Text style={styles.textStyle}>
                {'Reset Password'}
              </Text>
              <Text style={[styles.textStyle, {
                color: '#999999', fontSize: FONTSIZE.Text15,
              }]}>
                {'Enter your email to change your password.'}
              </Text>
            </View>
          </View>


          <View style={{ marginTop: 20 }}>
            <View style={[styles.textInput, { justifyContent: 'space-between' }]}>
              <TextInput
                returnKeyType="done"
                placeholderTextColor={'#999999'}
                placeholder="Email"
                style={{
                  fontSize: FONTSIZE.Text16,
                  fontFamily: 'AvenirNext-Regular',
                  letterSpacing: 0.1,
                  width: '60%',
                  color: '#000',
                  paddingLeft: getWp(10)
                }}
                onChangeText={value => setUserName(value)}
                value={username}
              />
            </View>
          </View>

          {!isKeyboardOpen && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignSelf: 'center',
              }}>
              <CustomButton
                userContinue
                ButtonTitle={'Continue'}
                onPress={handleSubmit}
              />
            </View>
          )}

        </View>
      </ScrollView>
    </Scaffold>
  );
}
ForgotPassword.routeName = '/ForgotPassword';

const styles = StyleSheet.create({
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: getHp(20),
    flexDirection: 'column',
  },
  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  textStyle: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text22,
    color: '#000000'
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  textInput: {
    flexDirection: 'row',
    height: getHp(49),
    backgroundColor: '#F2F5F6',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: FONTSIZE.Text16,
    marginTop: 20,
    color: '#000',
  },
});
