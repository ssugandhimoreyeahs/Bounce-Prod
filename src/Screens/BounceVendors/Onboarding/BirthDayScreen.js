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
import LiveScreen from './LiveScreen';
import moment from 'moment';

export default function BirthDayScreen(props) {
    const {
        navigation
    } = props
    const { name, username, password } = props.route.params
    console.log("BIRTHDAY PROPS -->", props.route.params)
    const [birthday, setBirthday] = useState('')
    const [putFocus, setFocus] = useState(false)
    const dispatch = useDispatch()
    const reducerData = useSelector((state) => state.login);
    // console.log("Birthday Page : USERNAME FROM REDUX -->", reducerData)

    const handleSubmit = async () => {
        if (birthday != '') {
            navigation.navigate(LiveScreen.routeName, {
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
                    <Text style={styles.HeadingStyle}>{"When’s your birthday?"}</Text>

                    <View style={{ marginVertical: 40 }}>

                        <DatePicker
                            setBirthday={setBirthday}
                            birthday={birthday == '' ? '' : moment(birthday).format('MMM DD, YYYY')}
                            tillToday
                        /> 
                    </View>

                    <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                    <ProgressCircle currentProgress={3} containerStyle={{marginBottom: 20}}/>
                        <CustomButton
                            linear
                            bar
                            onPress={handleSubmit}
                        />
                    </View>


                </View>
            </KeyboardAwareScrollView>
        </Root>
    )
}

BirthDayScreen.routeName="/BirthDayScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        // justifyContent:'space-between',
        // backgroundColor:'red'
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    HeadingStyle: {
        marginTop: 40,
        fontFamily: 'Avenir Next',
        letterSpacing: 1.6,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text26,
        fontWeight: 'bold',
        // alignSelf:'center'
    },
    signStyle: {
        fontFamily: 'Avenir Next',
        letterSpacing: 1,
        color: '#000',
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomColor: '#1FAEF7',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold',
        marginTop: 10
    },
    TitleStyle: {
        fontSize: 14,
        paddingVertical: 0
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
