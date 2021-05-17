import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import { Header, Root, Checkbox, SignupDoubleButton, CustomButton, FloatingInput } from '@components'
import { Interested, Going, Arrived, CantGo, UploadCamera, DJ2 } from '@assets';
import { Avatar } from 'react-native-elements'
import axios from "axios";
import { FONTSIZE, getHp, getWp } from '@utils'
import { connect, useSelector, useDispatch } from "react-redux";
// import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { useFirebaseUpload } from '@hooks'
// import CustomTextinput from '../../../components/CustomTextinput';
import { useLoader } from '@hooks'
import David from '@assets/David.png'
import { Alert } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

export default function AccountSetting(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const handleSpace = (value) => {
        let regSpace = new RegExp(/\s/);
        if (regSpace.test(value)) {
            setUsername(value.trim())
            ToastAndroid.show("Username cannot contain space !")
        } else {
            setUsername(value)
        }
    }
    return (<Root>
        <ScrollView
            keyboardShouldPersistTaps='always'
            style={{ backgroundColor: '#fff' }}>

            <Header
                back
                headerTitle={"Account Settings"}
                onPress={() => props.navigation.goBack()}
            />

            <View style={styles.container}>
                <FloatingInput
                    floatingLabel={"Username"}
                    onChange={handleSpace}
                    value={username}
                />
                <FloatingInput
                    floatingLabel={"Phone Number"}
                    onChange={(value) => setPhone(value)}
                    value={phone}
                />
                <FloatingInput
                    floatingLabel={"Email"}
                    value={email}
                    onChange={(value) => setEmail(value)}
                />
                <View style={{ width: '70%', paddingVertical: getHp(20) }}>
                    <Text style={{
                        fontSize: FONTSIZE.Text20, fontWeight:'bold', color: '#000', marginVertical: 10, fontFamily: 'AvenirNext',
                    }}>Invitaiton Notifications</Text>
                    <Text style={{
                        fontSize: FONTSIZE.Text17, color: '#696969', marginVertical: 0, fontFamily: 'AvenirNext', lineHeight: 24
                    }}>How would you like to recieve event invitations? </Text>
                </View>
                <Checkbox
                    title={"Email"}
                />
                <Checkbox
                    title={"Text Message"}
                />


            </View>
        </ScrollView>
    </Root>
    )
}
AccountSetting.routeName = "/AccountSetting";
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10
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
    TitleStyle: {
        fontFamily: 'AvenirNext',
        fontSize: 16,
        paddingVertical: 5
    },
    crossButton: {
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        right: -10,
        top: -10
    },

})
