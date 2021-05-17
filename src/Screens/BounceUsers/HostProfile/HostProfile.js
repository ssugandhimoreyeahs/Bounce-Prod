import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { CustomTextinput, FloatingInput, CustomButton, Root, GooglePlacesInput } from '@components'
import { Avatar } from 'react-native-elements'
import {
    UploadBlue,
    BlackClose,
    Spotify,
    Insta,
    Twitter,
    Tiktok,
    Snapchat
} from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import { FONTSIZE } from '@utils'
import { useSelector, useDispatch } from "react-redux";
import { getHp, getWp } from '@utils'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { UserContext } from "../../../context/profiledataProvider";
import { ApiClient } from '../../../app/services';

export default function HostProfile(props) {
    const {
        userinfo,
        fetchProfile, } = useContext(UserContext)

    const [loader, setLoader] = useState(false);
    const [fullName, setFullname] = useState(null)
    const [getBirthday, setBirthday] = useState(null)
    const [city, setCity] = useState(null)
    const [bio, setBio] = useState(null)

    const [snapchat, setSnapchat] = useState(null)
    const [instagram, setInstagram] = useState(null)

    const [picture, setPicture] = useState(null)
    const [footer, openFooter] = useState(false)
    const [twitter, setTwitter] = useState('')
    const [tiktok, setTiktok] = useState('')
    const dispatch = useDispatch()


    // const {
    //     token = {},
    //     user = {}
    // } = useSelector((state) => state.mainExpenseByCategory.userProfileData);
    // console.log("USER BLOCK ON HOST PROFILE", user);
    const token = userinfo?.token
    const user = userinfo?.user
    if (!user) {
        return null;
    }
    const handleImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            setPicture(image.path)
        });
    }
    const ImageFooter = () => {
        return (
            <TouchableOpacity onPress={() => setPicture(null)} style={styles.crossButton}>
                <BlackClose height={15} width={15} />
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        fetchProfile()
        setData()
    }, [])

    const setData = async () => {
        setLoader(true)

        setPicture(user?.profileImage?.filePath)
        setFullname(user?.fullName)
        setBio(user?.about)
        setCity(user?.city)
        setBirthday(user.birthday)
        setInstagram(user.instagramUsername)
        setSnapchat(user.snapchatUsername)
        setLoader(false)
    }

    const handleSubmit = async () => {
        // console.log("HANDLE SUBMIT CALLED");
        setLoader(true)

        let milliseconds = new Date().getTime();

        let imgObj = {
            uri: `${picture}`,
            type: "image/jpeg",
            name: `image-${milliseconds}.jpg`,
        }

        console.log("PICTURE", picture);
        console.log("THIS IS FULL NAME", fullName)
        console.log("THIS IS FULL city", city)
        console.log("THIS IS FULL getBirthday", getBirthday)
        console.log("THIS IS FULL bio", bio)
        console.log("THIS IS FULL snapchat", snapchat)
        console.log("THIS IS FULL instagram", instagram)

        let formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('city', city)
        formData.append('birthday', getBirthday)
        formData.append('about', bio)
        formData.append('snapchatUsername', snapchat)
        formData.append('instagramUsername', instagram)
        formData.append('profileImageFile', imgObj)

        console.log("TOKEN", token);

        const SERVER_RESPONSE = await ApiClient.authInstance.post(ApiClient.endPoints.postUser, formData).then(async (i) => {
            await fetchProfile()

            console.log(i)
            setLoader(false)
        }).catch(e => {
            console.log(e)
            setLoader(false)
        })


        console.log("SERVER_RESPONSE", SERVER_RESPONSE);
        console.log("PROFILE_SERVER_RESPONSE", SERVER_RESPONSE);
        let StringifyData = await JSON.stringify(SERVER_RESPONSE.data)
        console.log("parsedData", JSON.parse(StringifyData))

        let ParsedData = await JSON.parse(StringifyData)
        console.log("PROFILE_ACCESS_TOKEN", ParsedData.accessToken);

        if (SERVER_RESPONSE.status == 201 || SERVER_RESPONSE.status == 200) {
            props.navigation.goBack()
            setTimeout(() => {
                ToastAndroid.show("Profile Updated Successfully!")
            }, 200);
        }
        setLoader(false)
    }


    return (<Root>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader &&

            <ScrollView
                // keyboardShouldPersistTaps='always'
                style={{ backgroundColor: '#fff', flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {picture == null ?
                    <TouchableOpacity onPress={handleImage} style={{ padding: 20, marginVertical: getHp(30), justifyContent: 'center', alignItems: 'center' }}>
                        <UploadBlue height={getHp(90)} width={getHp(90)} />
                        <Text style={{
                            fontSize: FONTSIZE.Text19, color: '#000', marginTop: 10, fontFamily: 'AvenirNext',
                        }}>Upload Profile Picture</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <View style={{ marginVertical: getHp(0), justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => openFooter(true)} style={{ marginVertical: 30 }}>
                                <Avatar source={{
                                    uri: picture,
                                }} size={getHp(250)} rounded />
                                <View style={{ alignItems: 'center' }}>
                                    <UploadBlue height={getHp(50)} width={getWp(50)} style={{ position: 'absolute', bottom: -25, resizeMode: 'contain' }} />
                                </View>
                                {footer ?
                                    <ImageFooter />
                                    : null
                                }
                            </TouchableOpacity>
                        </View>

                    </>
                }

                <View style={{ paddingHorizontal: getWp(10), backgroundColor: '#fff', paddingBottom: 15 }}>
                    <FloatingInput
                        floatingLabel={"Full Name"}
                        value={fullName == null ? user.fullName : fullName}
                        onChange={(value) => setFullname(value)}
                    />

                    <FloatingInput
                        floatingLabel={"Birthday"}
                        onChange={(value) => setBirthday(value)}
                        value={getBirthday == null ? user.birthday : getBirthday}
                    />
                    {console.log("user.city", user.city)}
                    <GooglePlacesInput
                        floatingLabel={"City (or cities)"}
                        onPress={(data) => {
                            setCity(data.description)

                        }}
                        value={city == null ? user.city : city}
                    />

                    <CustomTextinput
                        text={"Bio"}
                        multiline
                        value={bio == null ? user.about : bio}
                        onChange={(value) => setBio(value)}
                    />
                    <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text22, marginTop: getHp(20), marginBottom: getHp(10), color: '#000', fontWeight: 'bold' }]}>{"Social Links"}</Text>

                    <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.flex}>
                            <Spotify height={30} width={30} />
                            <Text style={[styles.headerTitle, { fontWeight: 'bold', marginLeft: 10 }]}>{"Spotify"}</Text>
                        </View>
                        <Text style={[styles.headerTitle, { color: '#1FAEF7', fontWeight: 'bold' }]}>{"Connect"}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: '#999999', fontWeight: 'bold', marginBottom: 8 }]}>{"Tap to Refresh"}</Text>

                    <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.flex}>
                            <Insta height={30} width={30} />
                            <TextInput
                                placeholder={`Instagram`}
                                placeholderTextColor={'#000'}
                                value={instagram == null ? user.instagramUsername : instagram}
                                onChangeText={(value) => setInstagram(value)}
                                style={[styles.headerTitle, { marginLeft: 10, fontWeight: 'bold' }]}
                            />

                        </View>
                        <Text style={[styles.headerTitle, { color: '#1FAEF7', fontWeight: 'bold' }]}>{"Connect"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.flex}>
                            <Twitter height={30} width={30} />
                            <TextInput
                                placeholder={`@twitter`}
                                placeholderTextColor={'#999999'}
                                onChangeText={(value) => setTwitter(value)}
                                style={[styles.headerTitle, styles.Tiktok]}
                                value={twitter}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.flex}>
                            <Tiktok height={30} width={30} />
                            <TextInput
                                placeholder={`@tiktok`}
                                placeholderTextColor={'#999999'}
                                onChangeText={(value) => setTiktok(value)}
                                style={[styles.headerTitle, styles.Tiktok]}
                                value={tiktok}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.flex}>
                            <Snapchat height={30} width={30} />
                            <TextInput
                                placeholder={`@snapchat`}
                                placeholderTextColor={'#999999'}

                                onChangeText={(value) => setSnapchat(value)}
                                style={[styles.headerTitle, styles.Tiktok]}
                                value={snapchat == null ? user.snapchatUsername : snapchat}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ paddingHorizontal: getWp(10) }}>
                    <CustomButton
                        complete
                        bar
                        onPress={handleSubmit}
                        ButtonTitle={"Save Changes"}
                    />
                </View>

            </ScrollView>
        }
    </Root>
    )
}
HostProfile.routeName = "/HostProfile";
const styles = StyleSheet.create({
    Tiktok: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000',
        width: '100%'
    },
    headerTitle: {
        // alignContent: 'center',
        color: '#000',
        fontSize: FONTSIZE.Text16,
        // fontWeight: 'bold',
        fontFamily: 'AvenirNext',
    },
    addInterest: {
        elevation: 5,
        backgroundColor: '#fff',
        height: getHp(130),
        width: getHp(150),
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    socialButton: {
        elevation: 5,
        borderRadius: 13,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1
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
