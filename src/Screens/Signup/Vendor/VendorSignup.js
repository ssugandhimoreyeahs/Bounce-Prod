import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, } from 'react-native'
import { Header, FloatingInput, CustomButton, Root } from '@components'
import { Avatar } from 'react-native-elements'
import { UploadBlue, BlackClose } from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { FONTSIZE, validateEmail, validatePass } from '@utils'
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { getHp, getWp, } from '@utils'
import { ApiClient } from '../../../app/services';
import VendorMarketProfile from './VendorMarketProfile';
import { Scaffold } from '@components'
import { Toast } from '@constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function VendorSignup(props) {
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
            cropping: true
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
            // let validateP = await validatePass(password)

            if (!validateE) {
                console.log("values res of email", validateE);
                Toast("Please enter valid email !");

            }
            else if (password.length < 7) {
                return Toast('Password should be 8 characters long !');
            }
            // else if (!validateP) {
            //     console.log("values res of pass", validateP);
            //     Toast("Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter !");

            // }
            else if (picture == null) {
                // console.log("pciture null");
                Toast("Please select the profile picture!");
            }
            else if ((phone.length >
                10)) {
                // console.log("Phone number");
                Toast("Please Enter valid number!");
            }
            else
                if (username.length > 0 &&
                    password.length > 0 &&
                    email.length > 0 &&
                    phone.length > 0
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
                        Toast(res.message);
                    }
                } else {
                    console.log("2 blockk");
                    setLoader(false)
                    Toast("Please fill all the field's with valid data !");

                }
        } catch (err) {
            // console.log("Error", err.message)
            Toast("Vendor Username or Number already exist!");
        }
    }

    const handleSpace = (value, type = 'Username') => {
        let regSpace = new RegExp(/\s/);
        if (regSpace.test(value)) {
            if (type == 'Password') {
                setPassword(value.trim())
            } else {
                setUsername(value.trim())
            }
            Toast(`${type} ` + "cannot contain space !");
        } else {
            if (type == 'Password') {
                setPassword(value)
            } else {
                setUsername(value)
            }
        }
    }
    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#F4F4F4' }}>
            <Spinner visible={loader} color={'#1FAEF7'} />
        <KeyboardAwareScrollView >
            {/* <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: '#FBFBFB', flex: 1 }}> */}
            <Header
                headerBackColor={{ paddingBottom: 20, backgroundColor: '#F4F4F4' }}
                back
                headerStyleProp={{ fontFamily: 'AvenirNext-DemiBold', }}
                headerTitle={`Create ${vendorType} Profile`}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{ paddingBottom: getHp(0), paddingHorizontal: getWp(10), backgroundColor: '#FBFBFB' }}>

                {picture == null ?
                    <View style={{ padding: 0, marginVertical: getHp(60), justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleImage} style={[styles.shadowStyle, {
                            alignItems: 'center'
                        }]}>
                            <View style={{
                                borderRadius: 100,
                                elevation: 10,
                                backgroundColor: '#fff',
                            }}>
                                <UploadBlue height={getHp(100)} width={getHp(100)} />
                            </View>

                            <Text style={{
                                fontSize: FONTSIZE.Text16, color: '#000', marginTop: 15, fontFamily: 'AvenirNext-Regular',
                            }}>{"Upload Profile Picture"}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        <View style={{ marginVertical: getHp(23), justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => openFooter(true)} style={{ marginVertical: 30 }}>
                                <Avatar source={{
                                    uri: picture.path,
                                }} size={getHp(250)} rounded />
                                <View style={{ alignItems: 'center' }}>
                                    <UploadBlue
                                        height={getHp(90)}
                                        width={getWp(90)}
                                        style={{
                                            position: 'absolute',
                                            bottom: -40,
                                            resizeMode: 'contain',
                                        }}
                                    />
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
                    onChange={value => handleSpace(value, 'Username')}
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
                    onChange={value => handleSpace(value, 'Password')}
                    Password
                    value={password}
                />
                <View style={{ marginVertical: getHp(10) }} />
            </View>
            <View style={{ alignSelf: 'center', width: '95%' }}>
                <CustomButton
                    complete
                    onPress={handleData}
                />
            </View>
        </KeyboardAwareScrollView>

    </Scaffold>
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
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 2,
    },

})
