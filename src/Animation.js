import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Animated, Dimensions,ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
} from '@components'
import {
    Apple,
    Insta,
    Google,
} from '@svg'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { FONTSIZE } from '@utils'
import { connect, useSelector, useDispatch } from "react-redux";
import { Toast } from '@constants';
const { height, width } = Dimensions.get('screen')



function LoginScreen(props) {
    const {
        navigation
    } = props
    const [animated, setAnimated] = useState({ ballAnimation: new Animated.Value(0) })
    const [password, setPassword] = useState('')
    const {
        vendorProfileData
    } = useSelector((state) => state.mainExpenseByCategory);

    const handleUserLogin = async () => {
        let body = {
            "username": username,
            "password": password,
        }
        const SERVER_USER_LOGIN = await postData('user/hostlogin', body)
        console.log("SERVER_USER_LOGIN", SERVER_USER_LOGIN);
        console.log(SERVER_USER_LOGIN.success);
        if (SERVER_USER_LOGIN.success == true) {
            navigation.navigate('UserFriendsProfile')
        } else {
                Toast("Invalid Credentials!")
        }
    }

    const animateBall = () => {
        Animated.timing(animated.ballAnimation, {
            toValue: 200,
            duration: 1500,
        }).start()
      
    }
    const ballAnimation = {
     transform:[
         {
             translateY:animated.ballAnimation,
         }
     ]
    }

    return (
        <Root>
            <KeyboardAwareScrollView style={{}}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>BOUNCE</Text>

                    <TouchableOpacity onPress={animateBall}>
                        <Animated.View  
                        style={[{backgroundColor:'green'},ballAnimation]}>
                            <Text style={styles.signStyle}>Sign In</Text>
                            <TextInput
                                placeholder="Username"
                                style={styles.textInput}
                                multiline={true}
                                onChangeText={(value) => setUsername(value)}
                            />
                            <TextInput
                                placeholder="Password"
                                style={styles.textInput}
                                multiline={true}
                                onChangeText={(value) => setPassword(value)}
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    <LinearGradient colors={['#1FAEF7', '#AEE4FF']} style={[styles.linearGradient, { marginBottom: 20, width: '100%' }]}>
                        <TouchableOpacity onPress={handleUserLogin}>
                            <Text style={styles.buttonText}>
                                Login</Text>
                        </TouchableOpacity>
                    </LinearGradient>





                </View>
            </KeyboardAwareScrollView>
        </Root>
    )
}

LoginScreen.routeName = "/LoginScreen";

export default LoginScreen;
const styles = StyleSheet.create({
    temp: {
        backgroundColor: 'red'
    },
    ThirdParty: {
        color: '#000',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Regular',
    },
    buttonText: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: FONTSIZE.Text14,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
        color: '#ffffff',
        // backgroundColor: 'transparent',
    },
    linearGradient: {
        // flex: 1,
        width: '48%',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    HeadingStyle: {
        fontFamily: 'AvenirNext-Regular',
        letterSpacing: 1.6,
        color: '#000',
        fontSize: FONTSIZE.Text28,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    signStyle: {
        fontFamily: 'AvenirNext-Regular',
        letterSpacing: 1,
        color: '#000',
        fontSize: FONTSIZE.Text18,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomColor: '#1FAEF7',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text16,
        marginTop: 10,
        fontFamily: 'AvenirNext-Regular',
    },
    TitleStyle: {
        fontSize: FONTSIZE.Text14,
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
        height: 100
    },
    CardContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    }

})
