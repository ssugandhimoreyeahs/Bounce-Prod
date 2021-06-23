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



export default function HostProfile(props) {
  console.log("PROPS -> ", props);
  const { userProfile: userinfo } = MobxStore.authStore;
  const [loader, setLoader] = useState(false);
  const [fullName, setFullname] = useState('');
  const [getBirthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [instagram, setInstagram] = useState('');
  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [twitter, setTwitter] = useState('');
  const [tiktok, setTiktok] = useState('');
  const dispatch = useDispatch();


  const token = userinfo?.token;
  const user = userinfo?.user;

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
    setInstagram(user.instagramUsername);
    setSnapchat(user.snapchatUsername);
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

  console.log('profession', profession)
  console.log('bio', bio)
  return (
    <Scaffold
      statusBarStyle={{ backgroundColor: '#fff' }}>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='always'
          style={{ backgroundColor: '#FBFBFB', flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
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
                    value={tiktok}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Snapchat height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@snapchat`}
                    placeholderTextColor={'#999999'}
                    // onChangeText={value => setSnapchat(value)}
                    style={[styles.headerTitle, styles.Tiktok]}
                  // value={snapchat == '' ? '' : snapchat}
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
                    value={twitter}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton2}>
                <View style={styles.flex}>
                  <Linkedin height={getHp(30)} width={getHp(30)} />
                  <TextInput
                    placeholder={`@linkedin`}
                    placeholderTextColor={'#999999'}
                    onChangeText={value => setTwitter(value)}
                    style={[styles.headerTitle, styles.Tiktok]}
                    value={twitter}
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
              <Toggle />
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
              <Toggle />
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
              <Toggle />
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
              <Toggle />
            </View>



          </View>
          {/*Endd Privacy Block */}



          <View style={{ paddingHorizontal: getWp(10), paddingBottom: 80 }}>
            <CustomButton
              complete
              bar
              onPress={handleSubmit}
              ButtonTitle={'Save Changes'}
            />
          </View>
        </ScrollView>
      )}
    </Scaffold>
  );
}
HostProfile.routeName = '/HostProfile';
const styles = StyleSheet.create({
  privacyTitle: {
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
    fontSize: FONTSIZE.Text18,
  },
  Tiktok: {
    marginLeft: 10,
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
    width: '100%'
  },
  headerTitle: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Regular',
  },
  addInterest: {
    elevation: 2,
    backgroundColor: '#fff',
    height: getHp(130),
    width: getHp(150),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialButton: {
    height: getHp(50),
    elevation: 0,
    borderRadius: 13,
    paddingHorizontal: getWp(10),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  socialButton2: {
    height: getHp(50),
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    borderRadius: 13,
    paddingHorizontal: getWp(10),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20
  },
  crossButton: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10
  },

})
