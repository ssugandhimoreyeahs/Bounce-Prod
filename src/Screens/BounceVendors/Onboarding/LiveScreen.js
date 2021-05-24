import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
    CustomButton,
    QRCodes,
    ProgressCircle
} from '@components'
import RadialGradient from 'react-native-radial-gradient';
import {
    Apple,
    Insta,
    Google,
} from '@svg'
import QRCode from 'react-native-qrcode-svg';
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { FONTSIZE } from '@utils'
import ProfilePic from './ProfilePic';

export default function LiveScreen(props) {
    const {
        navigation
    } = props
    const [live, setLive] = useState('')
    const { name, username, password, birthday } = props.route.params
    // console.log("LIVE PROPS -->", props.route.params)

    const handleSubmit = async () => {
        if (live.length > 0) {
            navigation.navigate(ProfilePic.routeName, {
                birthday: birthday,
                username: username,
                password: password,
                name,
                live: live
            })
        } else {
            ToastAndroid.show("Please enter the value!")
        }
    }
    return (
        <Root>
            <KeyboardAwareScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>Where do you live?</Text>

                    <View style={{ marginVertical: 40 }}>
                        <TextInput
                            placeholder="Live"
                            style={styles.textInput}
                            onChangeText={(value) => setLive(value)}
                        />

                    </View>

                    <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                    <ProgressCircle currentProgress={4} containerStyle={{marginBottom: 20}}/>
                        <CustomButton
                            linear
                            bar
                            onPress={handleSubmit}
                        />
                    </View>
                    {/* <QRCode
                    value={"1"}
                    size={200}
                    
                /> */}
                    {/* <QRCode
                    value={"2"}
                /> */}

                    {/* <QRCodes /> */}
                </View>
            </KeyboardAwareScrollView>
        </Root>
    )
}

LiveScreen.routeName = "/LiveScreen";

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
        marginTop: 10,
        color: '#000'
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
