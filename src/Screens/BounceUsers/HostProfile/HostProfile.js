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
  ConnectSocialMedia,
  InputSocialMedia,
  GooglePlacesInput,
  HostToggleButton,
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
  }, [MobxStore.authStore.userProfile]);

  useEffect(() => {
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
    setInterested(user?.interested);
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
    formData.append('interested', interested);

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
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
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
              <ConnectSocialMedia
                icon={<Insta height={getHp(30)} width={getHp(30)} />}
                placeholder={`Instagram `}
              />

              {/* Second Spotify */}
              <ConnectSocialMedia
                icon={<Spotify height={getHp(30)} width={getHp(30)} />}
                placeholder={`Spotify `}
              />


              {/* Third Apple Music */}
              <ConnectSocialMedia
                icon={<AppleMusic height={getHp(30)} width={getHp(30)} />}
                placeholder={`Apple Music `}
                containerStyle={{ marginTop: getHp(5), marginBottom: getHp(30) }}
              />


              <InputSocialMedia
                icon={<Tiktok height={getHp(28)} width={getWp(28)} />}
                placeholder={`@tiktok`}
                onChangeText={value => setTiktok(value)}
                value={tiktok == 'null' ? '' : tiktok}
              />
              <InputSocialMedia
                icon={<Snapchat height={getHp(31)} width={getHp(31)} />}
                placeholder={`@snapchat`}
                onChangeText={value => setSnapchat(value)}
                value={snapchat == 'null' ? '' : snapchat}
              />
              <InputSocialMedia
                icon={<Twitter height={getHp(29)} width={getWp(29)} />}
                placeholder={`@twitter`}
                onChangeText={value => setTwitter(value)}
                value={twitter == 'null' ? '' : twitter}
              />
              <InputSocialMedia
                icon={<Linkedin height={getHp(31)} width={getHp(30)} />}
                placeholder={`@linkedin`}
                onChangeText={value => setLinkedIn(value)}
                value={linkedIn == 'null' ? '' : linkedIn}
              />

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

            <HostToggleButton
              placeholder={"Friend Count"}
              switchOn={friendCount}
              onChange={() => setFriendCount(!friendCount)}
              containerStyle={{
                paddingHorizontal: getWp(10),
                marginVertical: getHp(20),
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
              }}
            />

            <Text style={{
              fontFamily: 'AvenirNext-Regular',
              color: '#999999',
              fontSize: FONTSIZE.Text14,
              marginBottom: getHp(10),
              paddingHorizontal: getWp(10),
            }}>
              {"Only public events from the news feed are shared."}
            </Text>

            <HostToggleButton
              placeholder={"Hosting"}
              switchOn={hosting}
              onChange={() => setHosting(!hosting)}
            />
            <HostToggleButton
              placeholder={"Attending"}
              switchOn={attending}
              onChange={() => setAttending(!attending)}
            />
            <HostToggleButton
              placeholder={"Interested"}
              switchOn={interested}
              onChange={() => setInterested(!interested)}
            />

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

