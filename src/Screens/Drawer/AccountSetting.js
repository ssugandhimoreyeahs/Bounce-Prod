import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Header, Root, Checkbox, Scaffold, CustomButton, FloatingInput } from '@components'
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
import { Toast } from '@constants';
export default function AccountSetting(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const handleSpace = (value) => {
        let regSpace = new RegExp(/\s/);
        if (regSpace.test(value)) {
            setUsername(value.trim())
            Toast("Username cannot contain space !")
        } else {
            setUsername(value)
        }
    }
    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#FBFBFB' }}>
        <ScrollView
            keyboardShouldPersistTaps='always'
            style={{ backgroundColor: '#FBFBFB' }}>

            <Header
                headerBackColor={{ backgroundColor: '#FBFBFB', elevation: 0 }}
                back
                headerStyleProp={{
                    letterSpacing: 0.3,
                    fontSize: FONTSIZE.Text24,
                }}
                headerTitle={"My Account"}
                onPress={() => props.navigation.goBack()}
            />

            <View style={styles.container}>
                <FloatingInput
                    custom
                    floatingLabel={"Username"}
                    onChange={handleSpace}
                    value={username}
                />
                <FloatingInput
                    custom
                    floatingLabel={"Phone Number"}
                    onChange={(value) => setPhone(value)}
                    value={phone}
                />
                <FloatingInput
                    custom
                    floatingLabel={"Email"}
                    value={email}
                    onChange={(value) => setEmail(value)}
                />
                {/* <View style={{ width: '70%', paddingVertical: getHp(20) }}>
                    <Text style={{
                        fontSize: FONTSIZE.Text20, fontWeight: 'bold', color: '#000', marginVertical: 10, fontFamily: 'AvenirNext-Regular',
                    }}>Invitaiton Notifications</Text>
                    <Text style={{
                        fontSize: FONTSIZE.Text17, color: '#696969', marginVertical: 0, fontFamily: 'AvenirNext-Regular', lineHeight: 24
                    }}>{"How would you like to recieve event invitations? "}</Text>
                </View>
                <Checkbox
                    title={"Email"}
                />
                <Checkbox
                    title={"Text Message"}
                /> */}


            </View>
        </ScrollView>
    </Scaffold>
    )
}
AccountSetting.routeName = "/AccountSetting";
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
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
        fontFamily: 'AvenirNext-Regular',
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
