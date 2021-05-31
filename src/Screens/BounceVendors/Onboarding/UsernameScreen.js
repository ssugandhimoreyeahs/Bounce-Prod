import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
    CustomButton,
    ProgressCircle
} from '@components'
import { FONTSIZE, validateEmail, validatePass } from '@utils'
import { postData } from '../../../FetchServices'
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import BirthDayScreen from './BirthDayScreen';
import { ApiClient } from '../../../app/services';
import { Scaffold } from '@components'
import { Toast } from '@constants';

export default function UserNameScreen(props) {
    const {
        navigation
    } = props
    const { name } = props.route.params
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()


    const handleSubmit = async () => {
        try {
            let body = {
                vendorType: "2",
                name,
                username: username,
                password: password
            }

            let validateP = await validatePass(password)
            if (!validateP) {
                console.log("values res of pass", validateP);
                Toast.show("Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter !");

            } else if (username.length > 0 &&
                password.length > 0

            ) {
                setLoader(true)
                const res = await ApiClient.instance.post(ApiClient.endPoints.validateVendor, body)

                if (res.statusCode !== 404) {
                    dispatch(fetchVendorData(["FIRST_PAGE", body]))
                    setLoader(false)
                    props.navigation.navigate(BirthDayScreen.routeName, {
                        username: username,
                        password: password,
                        name
                    })
                } else if (res.statusCode == 404) {
                    setLoader(false)
                    Toast.show(res.message);
                }
            } else {
                setLoader(false)
                Toast.show("Please fill all the field's with valid data !");

            }
        } catch (error) {
 
            Toast('User already exist');
            console.log(error);
 
        }
    }

    // const handleSpace = (value) => {
    //     let regSpace = new RegExp(/\s/);
    //     if (regSpace.test(value)) {
    //         setUsername(value.trim())
    //         ToastAndroid.show("Username cannot contain space !", ToastAndroid.SHORT);
    //     } else {
    //         setUsername(value)
    //     }
    // }



    // const handleSubmit = async () => {
    //     let validateP = await validatePass(password)
    //     if (!validateP) {
    //         console.log("values res of pass", validateP);
    //         ToastAndroid.show("Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter !", ToastAndroid.SHORT);

    //     } else if (username.length > 0 &&
    //         password.length > 0) {
    //         navigation.navigate("Birthday", {
    //             username: username,
    //             password: password,
    //             name
    //         })
    //     }
    // }


    return ( 
        <Scaffold>
            <KeyboardAwareScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>{"Pick a username! 😜"}</Text>

                    <View style={{ marginTop:100 }}>
                        <TextInput
                            placeholder="@Username"
                            style={styles.textInput}
                            onChangeText={(value) => setUsername(value)}
                        />
                        <Text style={styles.infoText}>{"You won’t be able to change it!"}</Text>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            secureTextEntry
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>

                    <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                    <ProgressCircle currentProgress={2} containerStyle={{marginBottom: 20}}/>
                        <CustomButton
                            userContinue
                            onPress={handleSubmit}
                        />
                    </View>


                </View>
            </KeyboardAwareScrollView>
        </Scaffold>
    )
}
UserNameScreen.routeName = "/UserNameScreen";

const styles = StyleSheet.create({
    infoText: {
        fontSize: FONTSIZE.Text16,
        color: '#999999',
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.1,
        marginTop: 10
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
        color: '#000000'
    },
})
