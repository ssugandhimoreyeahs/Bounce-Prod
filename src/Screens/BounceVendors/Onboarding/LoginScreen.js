import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  BackHandler,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Scaffold} from '@components';
import {Apple, Insta, Google, Bounce} from '@svg';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {FONTSIZE, getHp, getWp, smallHitSlop} from '@utils';
import {connect, useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useIsFocused} from '@react-navigation/native';
import MobxStore from '../../../mobx';
import VendorCategory from '../../Signup/Vendor/VendorCategory';
import NameScreen from './NameScreen';
import ForgotPassword from './ForgotPassword';
import {BounceProLogo, BounceSplash} from '@svg';
import HostView from '../../MyEvents/HostView';
import {Toast} from '@constants';
import InstagramLogin from 'react-native-instagram-login';
import {BlueEye, GreyEye} from '@svg';
import {NotificationService} from '../../../app/services';
import VendorHomeDrawerNavigator from '../../../navigation/VendorNavigation/drawerNavigation';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';
import Modal from 'react-native-modal';

function LoginScreen(props) {
  const [animated, setAnimated] = useState({
    ballAnimation: new Animated.Value(-25),
  });
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [IGToken, setIGToken] = useState('');
  const [InstaLogin, setInstaLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {vendorProfileData} = useSelector(state => state.mainExpenseByCategory);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const {authStore} = MobxStore;

  const handleUserLogin = async () => {
    try {
      const loginResponse = await authStore.async.login(username, password);
      if (authStore.isAuthenticated && loginResponse.success) {
        if (authStore?.userProfile?.user?.vendorType == 2) {
          navigation.navigate(UserHomeDrawerNavigator.routeName);
        } else {
          navigation.navigate(VendorHomeDrawerNavigator.routeName);
        }
      }
    } catch (error) {
      console.log('ERROR_Login - ', error.response.data);

      let errorMsg = error?.response?.data?.message ?? 'Something went wrong!';
      Toast(errorMsg);
      // return Alert.alert('Message', errorMsg);
    }
  };

  const setIgToken = data => {
    setIGToken(data.access_token);
    setInstaLogin(false);
  };

  useEffect(() => {
    console.log("FCM Token ---->",NotificationService.getFcmToken())
  }, []);

  const animateBall = () => {
    Animated.timing(animated.ballAnimation, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  const ballAnimation = {
    transform: [
      {
        translateY: animated.ballAnimation,
      },
    ],
  };

  return (
    <Scaffold>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: '#FBFBFB'}}>
          <View style={styles.container}>
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <BounceSplash
                preserveAspectRatio="none"
                height={170}
                width={238}
              />
            </View>

            <Text style={styles.signStyle}>{'Sign In'}</Text>
            <View style={[styles.textInput, {justifyContent: 'space-between'}]}>
              <TextInput
                returnKeyType="done"
                placeholderTextColor={'#999999'}
                placeholder="Username"
                style={{
                  fontSize: FONTSIZE.Text16,
                  fontFamily: 'AvenirNext-Regular',
                  letterSpacing: 0.1,
                  width: '60%',
                  color: '#000',
                }}
                onChangeText={value => {
                  if (value.length == 0) {
                    animated.ballAnimation.setValue(-25);
                  }
                  setUsername(value);
                  animateBall();
                }}
              />
            </View>

            {username.length >= 1 ? (
              <Animated.View style={[ballAnimation]}>
                <View
                  style={[styles.textInput, {justifyContent: 'space-between'}]}>
                  <TextInput
                    placeholderTextColor={'#999999'}
                    returnKeyType="done"
                    placeholder="Password"
                    style={{
                      fontSize: FONTSIZE.Text16,
                      fontFamily: 'AvenirNext-Regular',
                      letterSpacing: 0.1,
                      width: '60%',
                      color: '#000',
                    }}
                    // multiline={true}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={!passwordVisible}
                  />
                  {passwordVisible ? (
                    <TouchableOpacity
                      hitSlop={smallHitSlop}
                      onPress={() => setPasswordVisible(!passwordVisible)}>
                      <BlueEye
                        height={getHp(20)}
                        width={getWp(20)}
                        style={{marginRight: getWp(15)}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      hitSlop={smallHitSlop}
                      onPress={() => setPasswordVisible(!passwordVisible)}>
                      <GreyEye
                        height={getHp(20)}
                        width={getWp(20)}
                        style={{marginRight: getWp(15)}}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {
                  <TouchableOpacity
                    onPress={() => setModalVisible(!isModalVisible)}>
                    <Text
                      style={[
                        {
                          fontSize: FONTSIZE.Text12,
                          marginTop: getHp(5),
                          fontFamily: 'AvenirNext-Regular',
                          color: '#1FAEF7',
                        },
                      ]}>
                      {'Forgot Username / Password'}
                    </Text>
                  </TouchableOpacity>
                }

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']}
                  style={[
                    styles.linearGradient,
                    {marginTop: 30, marginBottom: 15, width: '100%'},
                  ]}>
                  <TouchableOpacity onPress={handleUserLogin}>
                    <Text
                      style={[styles.buttonText, {fontSize: FONTSIZE.Text16}]}>
                      {'Login'}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            ) : null}

            <View style={styles.CardContainer}>
              <TouchableOpacity
                // onPress={() => {
                //   this.instagramLogin.show();
                //   console.log('insta click');
                // }}
                style={[styles.Card, styles.boxShadow]}>
                <Insta height={getHp(30)} width={getWp(30)} />
                <Text style={styles.ThirdParty}>{'Instagram'}</Text>
              </TouchableOpacity>

              {Platform.OS == 'ios' && (
                <TouchableOpacity style={[styles.Card, styles.boxShadow]}>
                  <Apple height={getHp(30)} width={getWp(30)} />
                  <Text style={styles.ThirdParty}>{'Apple'}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.Card, styles.boxShadow]}>
                <Google height={getHp(26)} width={getWp(26)} />
                <Text style={styles.ThirdParty}>{'Google'}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View style={styles.Line} />
              <View>
                <Text style={styles.OR}>{'or'}</Text>
              </View>
              <View style={styles.Line} />
            </View>

            <TouchableOpacity
              style={[styles.linearGradient, styles.boxShadow, {marginTop: 20}]}
              onPress={() => navigation.navigate(NameScreen.routeName)}>
              <Text
                style={[
                  styles.buttonText,
                  {letterSpacing: 0.5, color: '#1FAEF7'},
                ]}>
                {'User Sign Up'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linearGradient, styles.boxShadow]}
              onPress={() =>
                props.navigation.navigate(VendorCategory.routeName)
              }>
              <Text
                style={[
                  styles.buttonText,
                  {letterSpacing: 0.5, color: '#F8A41E'},
                ]}>
                {'Vendor Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={isModalVisible}
            style={{backgroundColor: '#fff'}}
            presentationStyle={'formSheet'}
            // animationIn={'bounceInLeft'}
          >
            <ForgotPassword
              onBackPress={() => setModalVisible(!isModalVisible)}
              {...props}
            />
          </Modal>
        </KeyboardAwareScrollView>
      )}
      {/* <InstagramLogin
        ref={ref => (this.instagramLogin = ref)}
        appId="315364603524733"
        appSecret="f2bd03e5cfeb924622557378e282b384"
        redirectUrl="https://b2576732c16f.ngrok.io/auth/instagram/callback"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={data => setIgToken(data)}
        onLoginFailure={data => console.log(data)}
      /> */}
    </Scaffold>
  );
}
LoginScreen.routeName = '/LoginScreen';
export default LoginScreen;

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#EFEFEF',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 1,
  },
  Line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  OR: {
    color: '#DDDDDD',
    width: 50,
    textAlign: 'center',
    fontSize: getHp(18),
  },
  ThirdParty: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
  },
  buttonText: {
    fontSize: FONTSIZE.Text14,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: getHp(10),
    color: '#ffffff',
    // backgroundColor: 'transparent',
  },
  linearGradient: {
    justifyContent: 'center',
    height: getHp(50),
    elevation: 1,
    backgroundColor: '#fff',
    marginVertical: getHp(10),
    borderRadius: 20,
  },
  container: {
    // backgroundColor:'#fff',
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  HeadingStyle: {
    // fontFamily: 'AvenirNext-Regular',
    letterSpacing: 1.6,
    color: '#000',
    fontSize: FONTSIZE.Text28,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signStyle: {
    marginLeft: '2%',
    fontFamily: 'AvenirNext-Bold',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text18,
    // fontWeight: 'bold',
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

  TitleStyle: {
    fontSize: FONTSIZE.Text14,
    paddingVertical: 0,
  },
  Card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '28%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
