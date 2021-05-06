import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Animated, BackHandler, ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
} from '@components'
import {
    Apple,
    Insta,
    Google,
    Bounce
} from '@svg'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { FONTSIZE, getHp, getWp } from '@utils'
import { connect, useSelector, useDispatch } from "react-redux";
import { postData } from '../../../FetchServices';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native'
import RadialGradient from 'react-native-radial-gradient';
import { axiosPost, getData } from '../../../FetchServices'
import { fetchCurrentLoginData } from "../../../reducer/CurrentData";
import { LocalStorage } from '../../../app/utils/localStorage';
import { UserContext } from '../../../context/profiledataProvider';
import MobxStore from '@appMobx';

export default function LoginScreen(props) {
    const { fetchProfile } = useContext(UserContext);
    const [animated, setAnimated] = useState({ ballAnimation: new Animated.Value(-25) })
    const { navigation } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { vendorProfileData } = useSelector((state) => state.mainExpenseByCategory);
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();
    const [originalLangArray, setOriginalLangArray] = useState([])
    const [originalGenreArray, setOriginalGenreArray] = useState([])
    const [originalGuardArray, setOriginalGuardArray] = useState([])
    const dispatch = useDispatch();
    const { authStore } = MobxStore;
    const handleUserLogin = async () => {
        try {
            const loginResponse = await authStore.async.login(username, password);
            // console.log('LOGIN_RESPONSE - ', JSON.stringify(loginResponse));
            // return false;
            if (loginResponse.user.role == 2) {
                navigation.replace('rdrawer', {
                    screen: "UserFriendsProfile",
                });
            } else if (loginResponse.user.role == 1) {
                navigation.replace("btmstack", {
                    screen: "DjProfileScreen",
                });
            }
        } catch (error) {
            console.log('ERROR_Login - ', error);
            let errorMsg = 'Something went wrong!';
            if (error.message) {
                errorMsg = error.message;
            }
            return Alert.alert('Message', errorMsg);
        }
    }


    const animateBall = () => {
        Animated.timing(animated.ballAnimation, {
            toValue: 0,
            duration: 1000,
        }).start()
    }
    const ballAnimation = {
        transform: [
            {
                translateY: animated.ballAnimation,
            }]
    }

    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            {!loader &&
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', marginBottom: getHp(20) }}>
                            <Bounce height={getHp(32)} width={getWp(135)} />
                        </View>

                        <Text style={styles.signStyle}>{"Sign In"}</Text>
                        <TextInput
                            returnKeyType='done'
                            placeholder="Username"
                            style={[styles.textInput]}
                            onChangeText={(value) => {
                                setUsername(value)
                                animateBall()
                            }}
                        />

                        {username.length >= 1 ?
                            <Animated.View
                                style={[ballAnimation]}>
                                <TextInput
                                    returnKeyType='done'
                                    placeholder="Password"
                                    style={[styles.textInput]}
                                    // multiline={true}
                                    onChangeText={(value) => setPassword(value)}
                                    secureTextEntry
                                />


                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']}
                                    style={[styles.linearGradient, { marginTop: 30, marginBottom: 15, width: '100%' }]}>
                                    <TouchableOpacity onPress={handleUserLogin}>
                                        <Text style={styles.buttonText}>
                                            {"Login"}
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </Animated.View>
                            : null
                        }

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 10 }}>

                            <TouchableOpacity style={styles.linearGradient} onPress={() => navigation.navigate('Name')}>
                                <Text style={[styles.buttonText, { color: '#1FAEF7' }]}>
                                    {"Create an Account"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.linearGradient}
                                onPress={() => props.navigation.navigate('VendorSignupScreen')}>
                                <Text style={[styles.buttonText, { color: '#F8A41E' }]}>
                                    {"Vendor Sign Up"}
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                            <View style={styles.Line} />
                            <View>

                                <Text style={styles.OR}>or</Text>
                            </View>
                            <View style={styles.Line} />
                        </View>

                        <Text style={[styles.signStyle, { width: '100%' }]}>{"Sign in with"}</Text>

                        <View style={styles.CardContainer}>

                            <View style={styles.Card}>
                                <Insta height={30} width={30} style={{ margin: 10 }} />
                                <Text style={styles.ThirdParty}>{"Instagram"}</Text>
                            </View>

                            <View style={styles.Card}>
                                <Apple height={30} width={30} style={{ margin: 10 }} />
                                <Text style={styles.ThirdParty}>{"Apple"}</Text>
                            </View>

                            <View style={styles.Card}>
                                <Google height={30} width={30} style={{ margin: 10 }} />
                                <Text style={styles.ThirdParty}>{"Google"}</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            }
        </Root>
    )
}
const styles = StyleSheet.create({
    Line: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC'
    },

    OR: {
        width: 50,
        textAlign: 'center',
        fontSize: getHp(18)
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
        // flex: 1,
        // alignItems:'stretch',
        elevation: 2,
        backgroundColor: '#fff',
        width: '48%',
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
        alignSelf: 'center'
    },
    signStyle: {
        marginLeft: '2%',
        fontFamily: 'AvenirNext',
        letterSpacing: 1,
        color: '#000',
        fontSize: FONTSIZE.Text18,
        fontWeight: 'bold'
    },
    textInput: {
        fontSize: FONTSIZE.Text16,
        elevation: 2,
        backgroundColor: '#fff',
        paddingLeft: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 9.5
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
        height: 100
    },
    CardContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    }

})