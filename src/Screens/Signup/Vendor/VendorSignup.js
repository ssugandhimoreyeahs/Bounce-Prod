import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import { Header, FloatingInput, CustomButton, Root } from '@components'
import { Avatar } from 'react-native-elements'
import { UploadBlue, BlackClose } from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import { FONTSIZE, validateEmail, validatePass } from '@utils'
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { getHp, getWp, } from '@utils'
import { ApiClient } from '../../../app/services';
import VendorMarketProfile from './VendorMarketProfile';


export default function VendorSignup(props) {
    console.log("REACHED AT VENDOR SIGNUP SCREEN 2 -->")
    const { login, vendorType
    } = useSelector((state) => state.mainExpenseByCategory);
    const [username, setUsername] = useState('')
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [picture, setPicture] = useState(null)
    const [footer, openFooter] = useState(false)
    const dispatch = useDispatch()


    const handleImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
        }).then(image => {
            setPicture(image)
        });
    }


    const ImageFooter = () => {
        return (
            <TouchableOpacity onPress={() => setPicture(null)} style={styles.crossButton}>
                <BlackClose height={15} width={15} />
            </TouchableOpacity>
        )
    }


    const handleData = async () => {
        try {
            let body = {
                vendorType: "1",
                picture: picture,
                username: username,
                email: email,
                phone: phone,
                password: password
            }

            let validateE = await validateEmail(email)
            let validateP = await validatePass(password)

            if (!validateE) {
                console.log("values res of email", validateE);
                ToastAndroid.show("Please enter valid email !", ToastAndroid.SHORT);

            } else if (!validateP) {
                console.log("values res of pass", validateP);
                ToastAndroid.show("Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter !", ToastAndroid.SHORT);

            } else
                if (username.length > 0 &&
                    password.length > 0 &&
                    email.length > 0 &&
                    phone.length > 0 &&
                    picture != null
                ) {
                    console.log("1 st blockk");
                    setLoader(true)
                    const res = await ApiClient.instance.post(ApiClient.endPoints.validateVendor, body)
                    console.log("This is response", res)
                    if (res.statusCode !== 404) {
                        console.log("1.1 blockk");
                        dispatch(fetchVendorData(["FIRST_PAGE", body]))
                        setLoader(false)
                        props.navigation.navigate(VendorMarketProfile.routeName);
                    } else if (res.statusCode == 404) {
                        console.log("1.2 blockk");
                        setLoader(false)
                        ToastAndroid.show(res.message, ToastAndroid.SHORT);
                        // Alert.alert(res.message)

                    }
                } else {
                    console.log("2 blockk");
                    setLoader(false)
                    ToastAndroid.show("Please fill all the field's with valid data !", ToastAndroid.SHORT);

                }
        } catch (err) {
            // console.log("Error", err.message)
            ToastAndroid.show("Vendor Username or Number already exist!", ToastAndroid.SHORT);
        }
    }

    const handleSpace = (value) => {
        let regSpace = new RegExp(/\s/);
        if (regSpace.test(value)) {
            setUsername(value.trim())
            ToastAndroid.show("Username cannot contain space !", ToastAndroid.SHORT);
        } else {
            setUsername(value)
        }
    }
    return (<Root>
        <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: '#FBFBFB', flex: 1 }}>
            <Header
                back
                headerTitle={`Create ${vendorType} Profile`}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{ paddingBottom: getHp(80), paddingHorizontal: getWp(10), backgroundColor: '#FBFBFB' }}>

                {picture == null ?
                    <View style={{ padding: 0, marginVertical: getHp(60), justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleImage} style={{
                            alignItems: 'center'
                        }}>
                            <View style={{ borderRadius: 100, elevation: 10, backgroundColor: '#fff', }}>
                                <UploadBlue height={getHp(100)} width={getHp(100)} />
                            </View>

                            <Text style={{
                                fontSize: FONTSIZE.Text16, color: '#000', marginTop: 15, fontFamily: 'AvenirNext',
                            }}>{"Upload Profile Picture"}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        <View style={{ marginVertical: getHp(23), justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => openFooter(true)} style={{ marginVertical: 30 }}>
                                <Avatar source={{
                                    uri: picture.path,
                                }} size={getHp(224)} rounded />
                                <View >
                                    <UploadBlue height={50} width={50} style={{ position: 'absolute', bottom: -25, resizeMode: 'contain', alignSelf: 'center' }} />
                                </View>
                                {footer ?
                                    <ImageFooter />
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </>
                }
                <FloatingInput
                    floatingLabel={"Username"}
                    onChange={handleSpace}
                    value={username}
                />
                <FloatingInput
                    keyboardType={"numeric"}
                    floatingLabel={"Phone Number"}
                    onChange={(value) => setPhone(value)}
                    value={phone}
                />
                <FloatingInput
                    floatingLabel={"Email"}
                    value={email}
                    onChange={(value) => setEmail(value)}
                />

                <FloatingInput
                    floatingLabel={"Password"}
                    onChange={(value) => setPassword(value)}
                    Password
                    value={password}
                />
                <View style={{ marginVertical: getHp(10) }} />



            </View>
            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: '95%', paddingBottom: getHp(10) }}>
                <CustomButton
                    complete
                    onPress={handleData}
                />
            </View>
        </ScrollView>
    </Root>
    )
}
VendorSignup.routeName = "/VendorSignup";

const styles = StyleSheet.create({
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
