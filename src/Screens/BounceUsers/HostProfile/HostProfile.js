import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  CustomTextinput,
  FloatingInput,
  CustomButton,
  Root,
  GooglePlacesInput,
  Header
} from '@components';
import { Avatar } from 'react-native-elements';
import {
  UploadBlue,
  BlackClose,
  Spotify,
  AppleMusic,
  Insta,
  Linkedin,
  Twitter,
  Tiktok,
  Snapchat,
} from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import { FONTSIZE } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { getHp, getWp } from '@utils';
import Spinner from 'react-native-loading-spinner-overlay';
import { ApiClient } from '../../../app/services';
import { PrivacyBlock, Toggle } from '@components';
import MobxStore from '../../../mobx';
import { Scaffold } from '@components'
import { Toast } from '@constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './indexCss.js'

export default function HostProfile(props) {
  console.log("PROPS -> ", props);
  const { userProfile: userinfo } = MobxStore.authStore;
  const [loader, setLoader] = useState(false);
  const [fullName, setFullname] = useState('');
  const [getBirthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');

  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [friendCount, setFriendCount] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [attending, setAttending] = useState(false);
  const [interested, setInterested] = useState(false);

  const dispatch = useDispatch();


  const token = userinfo?.token;
  const user = userinfo?.user;

  console.log('snapchatUsername--', user.snapchatUsername)
  console.log('instagramUsername--', user.instagramUsername)




  if (!user) {
    return null;
  }


  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPicture(image.path);
    });
  };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => setPicture(null)}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };

  

  useEffect(() => {
    MobxStore.authStore.async.reloadUser();
    setData();
  }, []);

  const setData = async () => {
    setLoader(true);
    setPicture(user?.profileImage?.filePath);
    setFullname(user?.fullName);
    setBio(user?.about);
    setProfession(user?.profession);
    setCity(user?.city);
    setBirthday(user.birthday);

    setSnapchat(user?.snapchatUsername);
    setTiktok(user?.tiktokUsername);
    setTwitter(user?.twitterUsername);
    setLinkedIn(user?.linkedInUsername);

    setFriendCount(user?.friendCount);
    setHosting(user?.hosting);
    setAttending(user?.attending);
    setInterested(user?.intrested);
    setLoader(false);
  };

  const handleSubmit = async () => {
    setLoader(true);

    let milliseconds = new Date().getTime();
    let imgObj = {
      uri: `${picture}`,
      type: 'image/jpeg',
      name: `image-${milliseconds}.jpg`,
    };

    let formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('city', city);
    formData.append('birthday', getBirthday);
    formData.append('about', bio);
    formData.append('profession', profession);
    formData.append('profileImageFile', imgObj);
    formData.append('friendCount', friendCount);
    formData.append('hosting', hosting);
    formData.append('attending', attending);
    formData.append('intrested', interested);

    formData.append('snapchatUsername', snapchat);
    formData.append('tiktokUsername', tiktok);
    formData.append('twitterUsername', twitter);
    formData.append('linkedInUsername', linkedIn);

  
    console.log('TOKEN', token);

    await ApiClient.authInstance
      .post(ApiClient.endPoints.postUser, formData)
      .then(async i => {
        //await fetchProfile();
        MobxStore.authStore.async.reloadUser();
        console.log(i);
        if (i.status == 201 || i.status == 200) {
          setLoader(false);
          setTimeout(() => {
            Toast('Profile Updated Successfully!');
            props.navigation.goBack();
          }, 100);
        }

      })
      .catch(e => {
        console.log(e);
        setLoader(false);
      });

    setLoader(false);
  };

  return (
    <Scaffold
      statusBarStyle={{ backgroundColor: '#fff' }}>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}>
          <Header
            back
            headerTitle={"Host Profile"}
            onPress={() => {
              props.navigation.goBack();
            }}
            headerBackColor={{ backgroundColor: '#fff' }}
          />
          {picture == null ? (
            <TouchableOpacity
              onPress={handleImage}
              style={{
                padding: 20,
                marginVertical: getHp(30),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UploadBlue height={getHp(90)} width={getHp(90)} />
              <Text
                style={{
                  fontSize: FONTSIZE.Text16,
                  color: '#000',
                  marginTop: 10,
                  fontFamily: 'AvenirNext-Regular',
                }}>
                {"Upload Profile Picture"}
              </Text>
            </TouchableOpacity>
          ) : (
              <>
                <View
                  style={{
                    marginVertical: getHp(0),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => openFooter(true)}
                    style={{ marginVertical: 30 }}>
                    <Avatar
                      source={{
                        uri: picture,
                      }}
                      size={getHp(150)}
                      rounded
                    />
                    <View style={{ alignItems: 'center' }}>
                      <UploadBlue
                        height={getHp(60)}
                        width={getWp(60)}
                        style={{
                          position: 'absolute',
                          bottom: -25,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    {footer ? <ImageFooter /> : null}
                  </TouchableOpacity>
                </View>
              </>
            )}

          <View
            style={{
              backgroundColor: '#FBFBFB',
              paddingBottom: 15,
            }}>
            <View style={{ paddingHorizontal: getWp(10) }}>
              <FloatingInput
                custom
                floatingLabel={'Full Name'}
                value={fullName == '' ? '' : fullName}
                onChange={value => setFullname(value)}
              />

              <GooglePlacesInput
                custom
                floatingLabel={'City'}
                onPress={data => {
                  setCity(data.description);
                }}
                value={city === 'null' ? '' : city}
              />

              <FloatingInput
                custom
                floatingLabel={'Profession'}
                value={profession == 'null' ? '' : profession}
                onChange={value => setProfession(value)}
              />

              <CustomTextinput
                custom
                text={'Bio'}
                multiline
                value={bio == 'null' ? '' : bio}
                onChange={value => setBio(value)}
              />

              {/* </View> */}

              <View style={{ backgroundColor: '#F2F5F6', height: getHp(8), marginVertical: getHp(30) }} />

              {/* <View style={{ paddingHorizontal: getWp(10) }}> */}
              <Text
                style={[
                  styles.headerTitle,
                  {
                    fontSize: FONTSIZE.Text18,
                    marginBottom: getHp(15),
                    color: '#000',
                    fontFamily: 'AvenirNext-Medium'
                  },
                ]}>
                {'App Sync'}
              </Text>

              {/* First Insta */}
              <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
                <View style={styles.flex}>
                  <Insta height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`Instagram `}
                    placeholderTextColor={'#000'}
                    // value={instagram == '' ? '' : instagram}
                    // onChangeText={value => setInstagram(value)}
                    style={[
                      styles.headerTitle,
                      { marginLeft: 10, fontFamily: 'AvenirNext-Medium' },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.headerTitle,
                    { color: '#1FAEF7', fontFamily: 'AvenirNext-Medium', marginRight: getWp(10) },
                  ]}>
                  {'Connect'}
                </Text>
              </TouchableOpacity>


              {/* Second Spotify */}
              <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
                <View style={styles.flex}>
                  <Spotify height={getHp(30)} width={getHp(30)} />
                  <Text
                    style={[
                      styles.headerTitle,
                      { fontFamily: 'AvenirNext-Medium', marginLeft: 13 },
                    ]}>
                    {'Spotify'}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      color: '#1FAEF7',
                      fontFamily: 'AvenirNext-Medium',
                      marginRight: getWp(10)
                    },
                  ]}>
                  {'Connect'}
                </Text>
              </TouchableOpacity>

              {/* Third Apple Music */}
              <TouchableOpacity style={[styles.socialButton, styles.shadowStyle, { marginTop: getHp(5), marginBottom: getHp(30) }]}>
                <View style={styles.flex}>
                  <AppleMusic height={getHp(30)} width={getHp(30)} />
                  <Text
                    style={[
                      styles.headerTitle,
                      { fontFamily: 'AvenirNext-Medium', marginLeft: 13 },
                    ]}>
                    {'Apple Music'}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      color: '#1FAEF7',
                      fontFamily: 'AvenirNext-Medium',
                      marginRight: getWp(10)
                    },
                  ]}>
                  {'Connect'}
                </Text>
              </TouchableOpacity>
              {/* <Text
              style={[
                styles.headerTitle,
                { color: '#999999', fontFamily:'AvenirNext-Medium', marginBottom: 8 },
              ]}>
              {'Tap to Refresh'}
            </Text> */}

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Tiktok height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@tiktok`}
                    placeholderTextColor={'#999999'}
                    onChangeText={value => setTiktok(value)}
                    style={[styles.headerTitle, styles.Tiktok]}
                    value={tiktok == '' ? '' : tiktok}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Snapchat height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@snapchat`}
                    placeholderTextColor={'#999999'}
                    onChangeText={value => setSnapchat(value)}
                    value={snapchat == '' ? '' : snapchat}
                    style={[styles.headerTitle, styles.Tiktok]}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Twitter height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@twitter`}
                    placeholderTextColor={'#999999'}
                    onChangeText={value => setTwitter(value)}
                    style={[styles.headerTitle, styles.Tiktok]}
                    value={twitter == '' ? '' : twitter}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Linkedin height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@linkedin`}
                    placeholderTextColor={'#999999'}
                    onChangeText={value => setLinkedIn(value)}
                    style={[styles.headerTitle, styles.Tiktok]}
                    value={linkedIn == '' ? '' : linkedIn}
                  />
                </View>
              </TouchableOpacity>

            </View>

            {/* Privacy Block */}
            <View style={{ backgroundColor: '#F2F5F6', height: getHp(8), marginVertical: getHp(30) }} />

            <View style={{ paddingHorizontal: getWp(10) }}>

              <Text style={[styles.privacyTitle]}>
                {"Privacy Settings"}
              </Text>
              <Text style={{
                fontFamily: 'AvenirNext-Regular',
                color: '#999999',
                fontSize: FONTSIZE.Text14,
                marginVertical: getHp(5),
              }}>
                {"Choose what you want to share on your profile."}
              </Text>
            </View>


            <View style={[styles.flex, {
              paddingHorizontal: getWp(10),
              marginVertical: getHp(30),
              height: getHp(60),
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderColor: '#EEEEEE'
            }]}>
              <Text style={[styles.privacyTitle, { fontSize: FONTSIZE.Text16 }]}>
                {"Friend Count"}
              </Text>
              <Toggle
                switchOn={friendCount}
                onChange={() => setFriendCount(!friendCount)}
              />
            </View>

            <Text style={{
              fontFamily: 'AvenirNext-Regular',
              color: '#999999',
              fontSize: FONTSIZE.Text14,
              marginBottom: getHp(10),
              paddingHorizontal: getWp(10),
            }}>
              {"Private events will not be shared."}
            </Text>

            <View style={[styles.flex, {
              height: getHp(60),
              backgroundColor: '#FFFFFF',
              paddingHorizontal: getWp(10),
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderColor: '#EEEEEE'
            }]}>
              <Text style={[styles.privacyTitle, { fontSize: FONTSIZE.Text16 }]}>
                {"Hosting"}
              </Text>
              <Toggle
                switchOn={hosting}
                onChange={() => setHosting(!hosting)}
              />
            </View>

            <View style={[styles.flex, {
              height: getHp(60),
              backgroundColor: '#FFFFFF',
              paddingHorizontal: getWp(10),
              borderBottomWidth: 0.5,
              borderColor: '#EEEEEE'
            }]}>
              <Text style={[styles.privacyTitle, { fontSize: FONTSIZE.Text16 }]}>
                {"Attending"}
              </Text>
              <Toggle
                switchOn={attending}
                onChange={() => setAttending(!attending)}
              />
            </View>

            <View style={[styles.flex, {
              height: getHp(60),
              backgroundColor: '#FFFFFF',
              paddingHorizontal: getWp(10),
              borderBottomWidth: 0.5,
              borderColor: '#EEEEEE'
            }]}>
              <Text style={[styles.privacyTitle, { fontSize: FONTSIZE.Text16 }]}>
                {"Interested"}
              </Text>
              <Toggle
                switchOn={interested}
                onChange={() => setInterested(!interested)}
              />
            </View>
          </View>
          {/*Endd Privacy Block */}

          <View style={{ paddingHorizontal: getWp(10), paddingBottom: 10 }}>
            <CustomButton
              complete
              bar
              onPress={handleSubmit}
              ButtonTitle={'Save Changes'}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Scaffold>
  );
}
HostProfile.routeName = '/HostProfile';

