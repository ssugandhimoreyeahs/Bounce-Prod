import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {CustomButton} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {FONTSIZE} from '@utils';
import {ScrollView} from 'react-native';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {ApiClient} from '@bounceServices';
import {useKeyboardStatus} from '@hooks';

export default function ForgotPassword(props) {
  const {navigation} = props;
  const [username, setUserName] = useState('');
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
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <Scaffold>
      <ScrollView
        style={{flex: 1, backgroundColor: '#FBFBFB'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.HeadingStyle}>{'Forgot your password..?'}</Text>
          <View style={{marginTop: 100}}>
            <TextInput
              placeholder={'Enter Username'}
              placeholderTextColor="#999"
              style={styles.textInput}
              onChangeText={value => setUserName(value)}
              value={username}
            />
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
                linear
                ButtonTitle={'Submit'}
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
    color: '#000000',
  },
});
