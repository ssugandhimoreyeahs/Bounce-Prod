import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
    CustomButton
} from '@components'
import {
    UploadBlue,
    BlackClose,
    Google,
} from '@svg'
import { connect, useSelector, useDispatch } from "react-redux";
import { FONTSIZE, getHp, getWp } from '@utils'
import { Avatar } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { LocalStorage } from '../../../app/utils/localStorage';
import { UserContext } from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';

export default function ProfilePic(props) {
    const {
        authStore 
    } = MobxStore; 
    const { navigation } = props
    const [picture, setPicture] = useState(null)
    const [footer, openFooter] = useState(false)
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);

    const { name, username, password, birthday, live } = props.route.params
    console.log("ProfilePic PROPS -->", props.route.params)
    console.log(name, username, password, birthday, live);

    const handleSubmit = async () => {
        try {
        setLoader(true)
        if (picture != null) {
            
                let body = {
                    "username": username,
                    "password": password,
                    "fullName": name,
                    "city": live,
                    "birthday": birthday,
                }
                let milliseconds = new Date().getTime();
                console.log("PICTURE", picture);
                let imgObj = {
                    uri: `${picture.path}`,
                    type: "image/jpeg",
                    name: `image-${milliseconds}.jpg`,
                }
                let formData = new FormData()
                formData.append('fullName', name);
                formData.append('username', username);
                formData.append('password', password);
                formData.append('city', live);
                formData.append('birthday', birthday);
                formData.append('profileImageFile', imgObj);
                formData.append('vendorType',2);

                const response = await axios.post('http://3.12.168.164:3000/auth/host/register', formData); 
                if (response.status == 201 || response.status == 200) {
                    const result = await JSON.stringify(response.data)
                    console.log("NEW_USER_REGISTRATION ", result);  
                    authStore.onUserRegistration(response.data);
                    setLoader(false);
                    await props.navigation.navigate('UserFriendsProfile', {
                        params: {
                            body
                        }
                    });
                }
            } 
       else {
            setLoader(false)
            ToastAndroid.show("Please select a picture!", 1000);
        }
    }
        catch (e) {
            setLoader(false)
            console.log('ERROR - ', e);
            ToastAndroid.show('Please use different username !', 1000);

        }
    }


    const handleImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            console.log("PICTURE FIXED IN PICTURE");
            setPicture(image)
        });
        // openFooter(fa)
        // launchImageLibrary({}, (response) => {
        //     console.log('Respuesta =', response);
        //     // setPhotoURI(response.uri);
        //     if (response.didCancel) {
        //         alert('Subida cancelada');
        //     } else if (response.error) {
        //         alert('Error encontrado: ', error);
        //     } else {
        //         console.log("IMAGE RESPONSE", response);
        //         // let img = {
        //         //     uri: response.uri,
        //         //     type: response.type,
        //         //     name: response.fileName ||
        //         //         response.uri.substr(response.uri.lastIndexOf('/') + 1)
        //         // }
        //         setPicture(response.uri)
        //     }
        // });
    }

    const ImageFooter = () => {
        return (
            <TouchableOpacity onPress={() => setPicture(null)} style={styles.crossButton}>
                <BlackClose height={15} width={15} />
            </TouchableOpacity>
        )
    }
    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            {!loader &&
                <KeyboardAwareScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={styles.HeadingStyle}>
                            {"Add a profile pic!"}
                        </Text>

                        <View style={{ marginVertical: 40 }}>
                            {picture == null ?
                                <TouchableOpacity onPress={handleImage} style={{ padding: 20, marginVertical: getHp(60), justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 100, elevation: 10, backgroundColor: '#fff', }}>
                                        <UploadBlue height={getHp(100)} width={getHp(100)} />
                                    </View>
                                    <Text style={styles.uploadText}>
                                        {"Upload Profile Picture"}
                                    </Text>
                                </TouchableOpacity>
                                :
                                <>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => openFooter(true)} style={{ marginVertical: 30 }}>
                                            <Avatar source={{ uri: picture.path }} size={getHp(224)} rounded />

                                            <View >
                                                <UploadBlue height={getHp(69)} width={getHp(69)} style={{ position: 'absolute', bottom: -30, left: 75, resizeMode: 'contain' }} />
                                            </View>
                                            {picture == null ?
                                                null
                                                :
                                                <ImageFooter />
                                            }
                                        </TouchableOpacity>
                                    </View>

                                </>
                            }
                        </View>

                        <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>

                            <TouchableOpacity
                                onPress={() => ToastAndroid.show("This is under Development!", 200)}>
                                <Text style={styles.skip}>
                                    {"Skip the rest for now"}
                                </Text>
                            </TouchableOpacity>

                            <CustomButton
                                linear
                                bar
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            }
        </Root>
    )
}
const styles = StyleSheet.create({
    uploadText: {
        fontSize: FONTSIZE.Text16,
        color: '#000',
        marginTop: 10,
        fontFamily: 'AvenirNext',
        marginTop: 15,
    },
    skip: {
        fontSize: FONTSIZE.Text19,
        color: '#1FAEF7',
        marginBottom: getHp(15),
        fontFamily: 'AvenirNext',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
    },
    HeadingStyle: {
        marginTop: 40,
        fontFamily: 'Avenir Next',
        letterSpacing: 1.6,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text26,
        fontWeight: 'bold',
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
        fontFamily: 'AvenirNext',
        color: '#000'
    },
    TitleStyle: {
        fontSize: 14,
        paddingVertical: 0,
        fontFamily: 'AvenirNext',
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