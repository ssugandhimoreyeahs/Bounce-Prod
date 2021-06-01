import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  BackHandler,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Scaffold} from '@components';
import {Apple, Insta, Google, Bounce} from '@svg';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useIsFocused} from '@react-navigation/native';
import MobxStore from '../../../mobx';
import VendorCategory from '../../Signup/Vendor/VendorCategory';
import NameScreen from './NameScreen';
import {BounceProLogo, BounceSplash} from '@svg';
import HostView from '../../MyEvents/HostView';
import {Toast} from '@constants';

function LoginScreen(props) {
  const [animated, setAnimated] = useState({
    ballAnimation: new Animated.Value(-25),
  });
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {vendorProfileData} = useSelector(state => state.mainExpenseByCategory);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const {authStore} = MobxStore;
  const handleUserLogin = async () => {
    try {
      const loginResponse = await authStore.async.login(username, password);
    } catch (error) {
      console.log('ERROR_Login - ', error);
      let errorMsg = 'Something went wrong!';
      if (error.message) {
        errorMsg = error.message;
      }
      return Alert.alert('Message', errorMsg);
    }
  };

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
        <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#FBFBFB'}}>
          <View style={styles.container}>
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <BounceSplash
                preserveAspectRatio="none"
                height={170}
                width={238}
              />
            </View>

            <Text style={styles.signStyle}>{'Sign In'}</Text>
            <TextInput
              returnKeyType="done"
              placeholder="Username"
              style={[styles.textInput, {paddingBottom: getHp(10)}]}
              onChangeText={value => {
                if (value.length == 0) {
                  animated.ballAnimation.setValue(-25);
                }
                setUsername(value);
                animateBall();
              }}
            />

            {username.length >= 1 ? (
              <Animated.View style={[ballAnimation]}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Password"
                  style={[styles.textInput, {paddingBottom: getHp(10)}]}
                  // multiline={true}
                  onChangeText={value => setPassword(value)}
                  secureTextEntry
                />

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']}
                  style={[
                    styles.linearGradient,
                    {marginTop: 30, marginBottom: 15, width: '100%'},
                  ]}>
                  <TouchableOpacity onPress={handleUserLogin}>
                    <Text style={styles.buttonText}>{'Login'}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            ) : null}

            <View style={styles.CardContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate(HostView.routeName)}
                style={[styles.Card, styles.boxShadow]}>
                <Insta height={30} width={30} style={{margin: 10}} />
                <Text style={styles.ThirdParty}>{'Instagram'}</Text>
              </TouchableOpacity>

              <View style={[styles.Card, styles.boxShadow]}>
                <Apple height={30} width={30} style={{margin: 10}} />
                <Text style={styles.ThirdParty}>{'Apple'}</Text>
              </View>

              <View style={[styles.Card, styles.boxShadow]}>
                <Google height={30} width={30} style={{margin: 10}} />
                <Text style={styles.ThirdParty}>{'Google'}</Text>
              </View>
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
              <Text style={[styles.buttonText, {color: '#1FAEF7'}]}>
                {'User Sign Up'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linearGradient, styles.boxShadow]}
              onPress={() =>
                props.navigation.navigate(VendorCategory.routeName)
              }>
              <Text style={[styles.buttonText, {color: '#F8A41E'}]}>
                {'Vendor Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
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
  },
  buttonText: {
    fontSize: FONTSIZE.Text14,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff',
    // backgroundColor: 'transparent',
  },
  linearGradient: {
    justifyContent: 'center',
    height: 50,
    elevation: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
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
    // fontFamily: 'Comfortaa',
    letterSpacing: 1.6,
    color: '#000',
    fontSize: FONTSIZE.Text28,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signStyle: {
    marginLeft: '2%',
    fontFamily: 'AvenirNext-DemiBold',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text18,
    // fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#1FAEF7',
    borderBottomWidth: 1,
    fontSize: FONTSIZE.Text16,
    marginTop: 20,
    color: '#000',
  },

  TitleStyle: {
    fontSize: FONTSIZE.Text14,
    paddingVertical: 0,
  },
  Card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '28%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
});
