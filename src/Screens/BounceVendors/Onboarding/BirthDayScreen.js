import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
    CustomButton,
    DatePicker,
    ProgressCircle
} from '@components'
import RadialGradient from 'react-native-radial-gradient';
import {
    Apple,
    Insta,
    Google,
} from '@svg'
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchVendorData, } from "../../../reducer/mainexpensecategory";
import { FONTSIZE } from '@utils'
import ProfilePic from './ProfilePic';
import moment from 'moment';

export default function BirthDayScreen(props) {
    const {
        navigation
    } = props
    const { name, username, password } = props.route?.params
    console.log("BIRTHDAY PROPS -->", props.route.params)
    const [birthday, setBirthday] = useState('')
    const [putFocus, setFocus] = useState(false)
    const dispatch = useDispatch()
    const reducerData = useSelector((state) => state.login);
    // console.log("Birthday Page : USERNAME FROM REDUX -->", reducerData)

    const handleSubmit = async () => {
        if (birthday != '') {
            navigation.navigate(ProfilePic.routeName, {
                birthday: birthday,
                username: username,
                password: password,
                name
            })
        } else {
            ToastAndroid.show("Please select birthday!", 1000)
        }
    }
    return (
        <Root>
            <KeyboardAwareScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>{"When’s your birthday? 🎂"}</Text>

                    <View style={{ marginTop: 100 }}>
                        <DatePicker
                            setBirthday={setBirthday}
                            birthday={birthday == '' ? '' : moment(birthday).format('MMM DD, YYYY')}
                            tillToday
                        />
                    </View>

                    <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                    <ProgressCircle currentProgress={3} containerStyle={{marginBottom: 20}}/>
                        <CustomButton
                            userContinue
                            onPress={handleSubmit}
                        />
                    </View>


                </View>
            </KeyboardAwareScrollView>
        </Root>
    )
}

BirthDayScreen.routeName = "/BirthDayScreen";

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
