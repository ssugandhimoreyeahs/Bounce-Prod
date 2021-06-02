import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { Header, Root, GooglePlacesInput, CustomDropdown, CustomButton, FloatingInput, ModalDropDownComponent } from '@components'
import { Avatar } from 'react-native-elements'
import { UploadBlue, BlackCircleCross } from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import { FONTSIZE, getHp, getWp } from '@utils'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CustomTextinput from '../../../components/CustomTextinput';
import Spinner from 'react-native-loading-spinner-overlay';
import { UserContext } from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import { observer } from 'mobx-react';
import UploadInventory from '../../host/UploadInventory';
// import { na } from '@react-navigation/native';
import { Scaffold } from '@components'
import { Toast } from '@constants';

function DJSignup(props) {
    const { authStore } = MobxStore;
    const userinfo = authStore.userProfile;
    // const { userinfo, fetchProfile } = useContext(UserContext);
    const {
        languageReduxObject,
        genreReduxObject,
        certificationReduxObject,
    } = useSelector((state) => state.currentStateData);

    const scrollRef = useRef();
    const dispatch = useDispatch()
    const token = userinfo?.token
    const user = userinfo?.user
    const [business, setBusiness] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [picture, setPicture] = useState(null)
    const [loader, setLoader] = useState(false)
    const [city, setCity] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
    const [equipment, setEquipment] = useState(null)
    const [website, setWebsite] = useState(null)
    const [services, setServices] = useState(null)
    const [cuisines, setCuisines] = useState(null)
    const [armed, setArmed] = useState(null)
    const [footer, openFooter] = useState(false)
    const [language, setLanguage] = useState({ lang: [] })
    const [genre, setGenre] = useState({ countries: [] })
    const [certification, setCertification] = useState({ certi: [] });

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            handleFiller()
            fetchData()
        });

        return unsubscribe;
    }, [props.navigation, authStore.userProfile]);
    useEffect(() => {
        if (handleFiller) {
            handleFiller();
        }
        if (fetchData) {
            fetchData()
        }
    }, [authStore.userProfile])
    if (!user) {
        return null;
    }
    const { vendorCategoryName } = user
    let temp = []
    let genretemp = []
    let guardtemp = []
    const handleImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            // console.log(image);
            setPicture(image.path)
        });
    }
    const ImageFooter = () => {
        return (
            <TouchableOpacity onPress={() => setPicture(null)} style={styles.crossButton}>
                <BlackCircleCross height={30} width={30} />
            </TouchableOpacity>
        )
    }


    const fetchData = async () => {
        try {
            setBusiness(user.fullName)
            setEmail(user.email)
            setPhone(user.phoneNumber)
            setCity(user.city)
            setPrice(user.vendor.hourlyRate + "")
            setDescription(user.about)
            setEquipment(user.vendor.equipment)
            setWebsite(user.vendor.website)
            setServices(user.vendor.services)
            setCuisines(user.vendor.cuisines)
            setArmed(user.vendor.armed)
        } catch (error) {
            console.log('ERROR - ', error);
        };
    }
    const handleFiller = async () => {
        console.log("USER_LANG_TEST - ", JSON.stringify(user.language));
        setPicture(user.profileImage?.filePath != null ? user.profileImage?.filePath : null)
        let L = []
        user.language.map((item) => {
            L.push(item)
        })
        setLanguage(() => ({ lang: L }));


        let G = []
        user.vendor.genres.map((item) => {
            G.push(item)
        })
        setGenre(() => ({ countries: G }));


        let C = []
        await user.vendor.guardCertification.map((item) => {
            C.push(item)
        })
        setCertification({ certi: C })
    }




    const handleSubmit = async () => {

        try {
            if (picture == null) {
                return Alert.alert('Message', 'Please select profile picture!');
            }
            setLoader(true);

            let milliseconds = new Date().getTime();
            let imgObj = {
                uri: `${picture}`,
                type: "image/jpeg",
                name: `image-${milliseconds}.jpg`,
            }

            let formData = new FormData()
            formData.append('email', email)
            formData.append('phoneNumber', phone)
            formData.append('fullName', business)
            formData.append('city', city)
            formData.append('about', description)
            formData.append('website', website)
            formData.append('language', JSON.stringify(language.lang))
            formData.append('genres', JSON.stringify(genre.countries))
            formData.append('services', services)
            formData.append('guardCertification', JSON.stringify(certification.certi))
            formData.append('armed', armed)
            formData.append('cuisines', cuisines)
            formData.append('equipment', equipment)

            if (userinfo?.user?.profileImage != picture) {
                formData.append('profileImageFile', imgObj);
            } else {
                formData.append('profileImage', userinfo?.user?.profileImage?.id);
            }

            formData.append('hourlyRate', price);
            const venderRegisterResponse = await axios.post('http://3.12.168.164:3000/vendor/updatevendor', formData, {
                headers: {
                    'Authorization': 'bearer ' + `${token}`
                }
            })
            setLoader(false);
            if (venderRegisterResponse.status == 201 || venderRegisterResponse.status == 200) {
                Toast("Profile Updated Successfully!")
                authStore.async.reloadVendor();
            }

        } catch (error) {
            console.log('EDIT_PROFILE_ERROR - ', error);
            setLoader(false);
            setTimeout(() => {
                return Alert.alert('Message', 'Something went wrong');
            }, 300);
        }

    }
    console.log("LANG_TEST - ", language.lang);
    return (
        <Scaffold>
            <Spinner visible={loader} color={'#1FAEF7'} />

            <View style={styles.container}>

                <ScrollView keyboardShouldPersistTaps='always'
                    ref={scrollRef} >
                    <Header
                        back
                        headerTitle={"Edit Profile"}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>

                        <FloatingInput
                            floatingLabel={"Business Name"}
                            onChange={(value) => setBusiness(value)}
                            value={business}

                        />

                        {picture == null ?
                            <TouchableOpacity onPress={handleImage} style={{ padding: 20, marginVertical: getHp(30), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ borderRadius: 100, elevation: 10, backgroundColor: '#fff', }}>
                                    <UploadBlue height={getHp(100)} width={getHp(100)} />
                                </View>
                                <Text style={{
                                    fontSize: FONTSIZE.Text19, color: '#000', marginTop: 10, fontFamily: 'AvenirNext-Regular',
                                }}>{"Upload Profile Picture"}</Text>
                            </TouchableOpacity>
                            :
                            <>
                                <TouchableOpacity onPress={() => openFooter(true)}>
                                    <View style={{ marginBottom: getHp(23), justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ marginVertical: 30 }}>
                                            <Avatar source={{
                                                uri: picture,
                                            }} size={getHp(250)} rounded />

                                            <View style={styles.uploadCamera}>
                                                <UploadBlue height={getHp(100)} width={getWp(120)} style={{ resizeMode: 'contain', alignSelf: 'center' }} />
                                            </View>
                                            {footer ?
                                                <ImageFooter />
                                                : null
                                            }
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        }


                        <FloatingInput
                            floatingLabel={"Email"}
                            value={email}
                            onChange={(value) => setEmail(value)}
                        />
                        <FloatingInput
                            keyboardType={'numeric'}
                            floatingLabel={"Phone Number"}
                            onChange={(value) => setPhone(value)}
                            value={phone}
                        />

                        <GooglePlacesInput
                            floatingLabel={"City (or cities)"}
                            onPress={(data) => {
                                setCity(data.description)

                            }}
                            value={city}
                        />

                        <FloatingInput
                            keyboardType={'numeric'}
                            floatingLabel={"Starting Price"}
                            onChange={(value) => setPrice(value)}
                            value={`${price}`}
                        />
                        <FloatingInput
                            floatingLabel={"Website"}
                            onChange={(value) => setWebsite(value)}
                            value={website}
                        />
                        <CustomTextinput
                            text={"Description"}
                            multiline
                            onChange={(value) => setDescription(value)}
                            value={description}
                        />

                        {languageReduxObject?.length > 0 ?
                            <>
                                <ModalDropDownComponent
                                    onDropDownPress={() => {

                                        scrollRef.current.scrollToEnd({ animated: true });
                                    }}
                                    placeholder={'Please select language'}
                                    onInitialValue={[...language.lang]}
                                    options={languageReduxObject}
                                    labelProp={'label'}
                                    uniqueProp={'value'}
                                    onSelectItems={item => {
                                        setLanguage({ lang: item })
                                    }
                                    }
                                />

                            </>
                            : null
                        }

                        {vendorCategoryName == "DJ" ?
                            <>
                                {genreReduxObject?.length > 0 ?
                                    <>
                                        <ModalDropDownComponent
                                            placeholder={'Please select genre'}
                                            onInitialValue={genre.countries}
                                            options={genreReduxObject}
                                            labelProp={'label'}
                                            uniqueProp={'value'}
                                            onSelectItems={item => {
                                                setGenre({ countries: item })
                                            }
                                            }
                                        />
                                    </>
                                    : null}

                                <CustomTextinput
                                    text={"Equipment"}
                                    multiline
                                    onChange={(value) => setEquipment(value)}
                                    value={equipment}
                                />

                            </>
                            : null}

                        {vendorCategoryName == "Security" ?
                            <>
                                {certificationReduxObject?.length > 0 ?
                                    <>

                                        <ModalDropDownComponent
                                            placeholder={'Please select certification'}
                                            onInitialValue={certification.certi}
                                            options={certificationReduxObject}
                                            labelProp={'label'}
                                            uniqueProp={'value'}
                                            onSelectItems={item => {
                                                setCertification({ certi: item })
                                            }
                                            }
                                        />
                                    </>
                                    : null}

                                <FloatingInput
                                    floatingLabel={"Armed"}
                                    onChange={(value) => setArmed(value)}
                                    value={armed}
                                />
                            </>
                            : null}

                        {vendorCategoryName == "Catering" ?
                            <>
                                <FloatingInput
                                    floatingLabel={"Cuisines"}
                                    onChange={(value) => setCuisines(value)}
                                    value={cuisines}
                                />
                                <FloatingInput
                                    floatingLabel={"Services"}
                                    onChange={(value) => setServices(value)}
                                    value={services}
                                />
                            </>
                            :
                            null
                        }
                        {vendorCategoryName != "Catering" &&
                            vendorCategoryName != "Security" &&
                            vendorCategoryName != "DJ" ?
                            <>
                                <FloatingInput
                                    floatingLabel={"Services"}

                                    onChange={(value) => setServices(value)}
                                    value={services}
                                />
                            </>
                            : null
                        }
                        {user?.vendorCategoryName == 'Event Rentals' &&
                            <TouchableOpacity style={styles.colButtonStyle} onPress={() => props.navigation.navigate(UploadInventory.routeName, {
                                image: user?.vendor?.inventory
                            })} >
                                <Text style={[styles.titleStyle]}>
                                    {"Edit Inventory"}
                                </Text>
                            </TouchableOpacity>
                        }

                        <CustomButton
                            complete
                            onPress={handleSubmit}
                            ButtonTitle={"Continue"}
                        />
                        <View style={{ marginVertical: 40 }} />
                    </View>
                </ScrollView>
            </View>

        </Scaffold >
    )
}
const styles = StyleSheet.create({
    uploadCamera: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: -38,
        borderRadius: 100,
        elevation: 10,
        height: getHp(90),
        width: getHp(90),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    titleStyle: {
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text20,
        fontWeight: 'bold',
        letterSpacing: 0.2
    },
    container: {
        backgroundColor: '#FBFBFB',
    },
    crossButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    colButtonStyle: {
        alignSelf: 'center',
        width: '95%',
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 19,
        alignItems: 'center',
        height: getHp(54),
        justifyContent: 'center',
        marginTop: getHp(30),
        marginBottom: getHp(30)
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

})
DJSignup.routeName = "/DJSignup";

export default observer(DJSignup);