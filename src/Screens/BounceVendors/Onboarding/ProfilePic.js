import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Root, CustomButton, ProgressCircle } from '@components';
import { UploadBlue, BlackClose, Google } from '@svg';
import { connect, useSelector, useDispatch } from 'react-redux';
import { FONTSIZE, getHp, getWp } from '@utils';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import UserNavigation from '../../../navigation/UserNavigation';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { LocalStorage } from '../../../app/utils/localStorage';
import { UserContext } from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import moment from 'moment';
import { ApiClient, NotificationService } from '../../../app/services';
import { Scaffold } from '@components';
import { Toast } from '@constants';

export default function ProfilePic(props) {
  const { authStore } = MobxStore;
  const { navigation } = props;
  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [FCM, setFCM] = useState('');
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const { name, username, password, birthday, age, email } = props.route.params;

  useEffect(() => {
    let token = NotificationService.getToken();
    setFCM(token);
  }, []);

  const handleSubmit = async () => {
    try {
      setLoader(true);
      if (picture != null) {
        let birthday = moment(props.route.params.birthday).format('YYYY-MM-DD') + ' 00:00:00';
        console.log("BIRTHDAY Final---->", birthday);
        let milliseconds = new Date().getTime();
        // console.log('PICTURE', picture);
        let imgObj = {
          uri: `${picture.path}`,
          type: 'image/jpeg',
          name: `image-${milliseconds}.jpg`,
        };
        let formData = new FormData();
        formData.append('fullName', name);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('birthday', birthday);
        formData.append('age', age);
        formData.append('profileImageFile', imgObj);
        formData.append('vendorType', 2);
        formData.append('email', email);
        formData.append('firebaseTokens', FCM);

        const response = await ApiClient.instance.post(
          ApiClient.endPoints.userRegister,
          formData,
        );
        // axios.post('auth/host/register', formData);
        if (response.status == 201 || response.status == 200) {
          const result = await JSON.stringify(response.data);
          console.log('NEW_USER_REGISTRATION ', result);
          authStore.onUserRegistration(response.data);
          setLoader(false);
          if(authStore.isAuthenticated){
            navigation.navigate(UserHomeDrawerNavigator.routeName)
          }
        }
      } else {
        setLoader(false);
        Toast('Please select a picture!');
      }
    } catch (e) {
      setLoader(false);
      console.log('ERROR - ', e);
      Toast('Something went wrong!');
    }
  };

  const handleImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
      }).then(image => {
        setPicture(image);
      });
    } catch (error) {
      console.log('IMAGE_PICKER_ERROR - ', error);
    }
  }

  // const handleImage = () => {
  //   try {
  //     launchImageLibrary(
  //       {
  //         maxWidth: 300,
  //         maxHeight: 300,
  //         mediaType: 'photo',
  //         // cropping: true,
  //       },
  //       image => {
  //         // console.log(image);
  //         // console.log('PICTURE FIXED IN PICTURE');
  //         setPicture(image);
  //       },
  //     );
  //   } catch (error) {
  //     console.log('IMAGE_PICKER_ERROR - ', error);
  //   }


    // openFooter(fa)
    // launchImageLibrary({}, (response) => {
    //     console.log('Respuesta =', response);
    //     // setPhotoURI(response.uri);
    //     if (response.didCancel) {
    //         alert('Subida cancelada');
    //     } else if (response.error) {
    //         alert('Error encontrado: ', error);
    //     } else {
    //         console.log("IMAGE RESPONSE", response);
    //         // let img = {
    //         //     uri: response.uri,
    //         //     type: response.type,
    //         //     name: response.fileName ||
    //         //         response.uri.substr(response.uri.lastIndexOf('/') + 1)
    //         // }
    //         setPicture(response.uri)
    //     }
    // });


  // };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => setPicture(null)}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };
  return (
    <Scaffold>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: '#FBFBFB' }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.HeadingStyle}>
              {'Add a ???????????? profile pic!'}
            </Text>

            <View style={{ marginVertical: 40 }}>
              {picture == null ? (
                <TouchableOpacity
                  onPress={handleImage}
                  style={{
                    padding: 20,
                    marginVertical: getHp(60),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: '#fff',
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowOpacity: 0.3,
                      elevation: 2,
                      shadowRadius: 15,
                      shadowOffset: { width: 1, height: 13 },
                    }}>
                    <UploadBlue height={getHp(100)} width={getHp(100)} />
                  </View>
                  <Text style={styles.uploadText}>
                    {'Upload Profile Picture'}
                  </Text>
                </TouchableOpacity>
              ) : (
                  <>
                    <View
                      style={[
                        styles.shadowBox,
                        { justifyContent: 'center', alignItems: 'center' },
                      ]}>
                      <TouchableOpacity
                        onPress={() => openFooter(true)}
                        style={{ marginVertical: 30 }}>
                        <Avatar
                          source={{ uri: picture.path }}
                          size={getHp(224)}
                          rounded
                        />

                        <View style={styles.shadowBox}>
                          <UploadBlue
                            height={getHp(69)}
                            width={getHp(69)}
                            style={{
                              position: 'absolute',
                              alignSelf: 'center',
                              bottom: -30,
                              // left: 75,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        {picture == null ? null : <ImageFooter />}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignSelf: 'center',
              }}>
              <ProgressCircle
                currentProgress={5}
                containerStyle={{ marginBottom: 20 }}
              />

              <CustomButton userContinue onPress={handleSubmit} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Scaffold>
  );
}

ProfilePic.routeName = '/ProfilePic';

const styles = StyleSheet.create({
  uploadText: {
    fontSize: FONTSIZE.Text16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    marginTop: 15,
  },
  skip: {
    fontSize: FONTSIZE.Text19,
    color: '#1FAEF7',
    marginBottom: getHp(15),
    fontFamily: 'AvenirNext-Regular',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  signStyle: {
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#1FAEF7',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    color: '#000',
  },
  TitleStyle: {
    fontSize: 14,
    paddingVertical: 0,
    fontFamily: 'AvenirNext-Regular',
  },
  Card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
  shadowBox: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.3,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
