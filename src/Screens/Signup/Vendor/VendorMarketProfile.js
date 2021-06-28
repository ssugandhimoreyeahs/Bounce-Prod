import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import {
    Header, GooglePlacesInput, CustomDropdown, Root, CustomButton, FloatingInput,
    ModalDropDownComponent
} from '@components'
import axios from "axios";
import { axiosPost, getData } from '../../../FetchServices'
import { FONTSIZE, getHp } from '@utils'
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentLoginData } from "../../../reducer/CurrentData";
import CustomTextinput from '../../../components/CustomTextinput';
import { LocalStorage } from '../../../app/utils/localStorage';
import { UserContext } from '../../../context/profiledataProvider';
import Spinner from "react-native-loading-spinner-overlay";
import MobxStore from '../../../mobx';
import { ApiClient } from '../../../app/services';
import { Scaffold } from '@components'
import { Toast } from '@constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function VendorMarketProfile(props) {
    console.log("REACHED AT VENDOR MARKETPLACE SCREEN 3 -->")
    const {
        authStore
    } = MobxStore;
    const { fetchProfile } = useContext(UserContext);
    const scrollRef = useRef();
    const [business, setBusiness] = useState('')
    const [city, setCity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')

    const [language, setLanguage] = useState({ lang: [] })
    const [genre, setGenre] = useState({ countries: [] })
    const [equipment, setEquipment] = useState('')
    const [services, setServices] = useState('')
    const [cuisines, setCuisines] = useState('')
    const [certification, setCertification] = useState({ certi: [] })
    const [armed, setArmed] = useState('')

    const [loader, setLoader] = useState(true)
    const [originalLangArray, setOriginalLangArray] = useState([])
    const [originalGenreArray, setOriginalGenreArray] = useState([])
    const [originalGuardArray, setOriginalGuardArray] = useState([])

    const dispatch = useDispatch()

    const {
        languageReduxObject,
        genreReduxObject,
        certificationReduxObject
    } = useSelector((state) => state.currentStateData);

    const { vendorType,
        login } = useSelector((state) => state.mainExpenseByCategory);

    console.log(login.username);
    console.log(login.password);

    const handleSubmit = async () => {
        // console.log("HANDLE SUBMIT CALLED IN EDIT PROFILE");
        try {
            if (business.length > 0 &&
                city.length > 0 &&
                price.length &&
                website.length > 0 &&
                description.length > 0 &&
                language.lang.length > 0
            ) {

                try {
                    setLoader(true)
                    let milliseconds = new Date().getTime();
                    let imgObj = {
                        uri: `${login.picture.path}`,
                        type: "image/jpeg",
                        name: `image-${milliseconds}.jpg`,
                    }
                    let body = {
                        "username": login.username,
                        "password": login.password,
                    }

                    let formData = new FormData()
                    formData.append('username', login.username)
                    formData.append('password', login.password)
                    formData.append('email', login.email)
                    formData.append('phoneNumber', login.phone)
                    formData.append('fullName', business)
                    formData.append('city', city)
                    formData.append('state', 'MP')
                    formData.append('about', description)
                    formData.append('website', website)
                    formData.append('language', JSON.stringify(language.lang))
                    formData.append('genres', JSON.stringify(genre.countries))
                    formData.append('services', services)
                    formData.append('guardCertification', JSON.stringify(certification.certi))
                    formData.append('armed', armed)
                    formData.append('cuisines', cuisines)
                    formData.append('vendorCategoryName', vendorType)
                    formData.append('equipment', equipment)
                    formData.append('profileImageFile', imgObj)
                    formData.append('hourlyRate', price)

                    const response = await ApiClient.instance.post(ApiClient.endPoints.vendorRegister, formData)

                    console.log("RESPONSE IN FETCH SERVICES -- >", response)
                    if (response.status == 201 || response.status == 200) {
                        const result = await JSON.stringify(response.data)
                        console.log("result in fetch", result)
                        await LocalStorage.storeToken(JSON.stringify(body));
                        await LocalStorage.onSignUp(response.data.accessToken, JSON.stringify(response.data.user));
                        authStore.onVendorRegistration({ token: response.data.accessToken, user: response.data.user });
                        setLoader(false);
                    } else {
                        setLoader(false);
                    }

                } catch (e) {
                    console.log(e);
                    setLoader(false);
                    Alert.alert('Something went wrong!');

                }
            }
            else {
                setLoader(false)
                Toast("Please fill all the field's with valid data !");

            }
        } catch (error) {
            console.log('GLOBAL_CREATE_ERROR - ', error);
            setLoader(false);
            return Alert.alert('Message', 'Something went wrong');
        }
    }

    const fetchData = async () => {
        setLoader(true)
        console.log("1");
        let LANGUAGE_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getLanguage);
        console.log("LANGUAGE CHECKING->", LANGUAGE_SERVER)
        setOriginalLangArray(LANGUAGE_SERVER)
        let tempLanguage = []
        await LANGUAGE_SERVER.data.map((item) => {
            tempLanguage.push({ label: item.name, value: item.id, code: item.code })
        })
        console.log("LANGUAGE CHECKING 222->", tempLanguage)
        dispatch(fetchCurrentLoginData(["LANGUAGE_ARRAY", tempLanguage]))
        console.log("2");

        let GENRE_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getGenre);
        setOriginalGenreArray(GENRE_SERVER)
        let tempGenre = []
        await GENRE_SERVER.data.map((item) => {
            tempGenre.push({ label: item.name, value: item.id })
        })
        dispatch(fetchCurrentLoginData(["GENRE_ARRAY", tempGenre]))
        console.log("3");
        let GUARD_CERTIFICATION_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getCertification);
        setOriginalGuardArray(GUARD_CERTIFICATION_SERVER)
        let tempCERTIFICATION = []
        await GUARD_CERTIFICATION_SERVER.data.map((item) => {
            tempCERTIFICATION.push({ label: item.name, value: item.id })
        })
        dispatch(fetchCurrentLoginData(["CERTIFICATION_ARRAY", tempCERTIFICATION]))

        setLoader(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#F4F4F4' }}>
        <Spinner visible={loader} color={"#1FAEF7"} />
        {!loader && (
            <View style={styles.container}>
                {/* <ScrollView
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ backgroundColor: '#fff', flex: 1 }}
                    ref={scrollRef}  > */}
                <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"} ref={scrollRef} >

                    <Header
                        headerBackColor={{ paddingBottom: 20, backgroundColor: '#F4F4F4' }}
                        back
                        headerTitle={`Create ${vendorType} Profile`}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View style={{ paddingHorizontal: 10, paddingBottom: 20, paddingTop: 5 }}>
                        <FloatingInput
                            floatingLabel={"Business Name"}
                            onChange={(value) => setBusiness(value)}
                            value={business}
                        />

                        <GooglePlacesInput
                            floatingLabel={"City"}
                            onPress={(data) => {
                                console.log('DATA_TESt - ', data);
                                setCity(data.description)
                            }}
                        />

                        <FloatingInput
                            keyboardType={"numeric"}
                            floatingLabel={"Starting Price"}
                            onChange={(value) => setPrice(value)}
                            value={price}
                        />

                        <FloatingInput
                            floatingLabel={"Website"}
                            onChange={(value) => setWebsite(value)}
                            // placeholder={'https://www.abc.com'}
                            value={website}
                        />
                        <CustomTextinput
                            text={"Description"}
                            multiline
                            value={description}
                            onChange={(value) => setDescription(value)}
                        />

                        {languageReduxObject.length > 0 ?
                            <>
                                <ModalDropDownComponent
                                    readOnly
                                    onDropDownPress={() => {

                                        scrollRef.current.scrollToEnd({ animated: true });
                                    }}
                                    placeholder={'Please select language'}
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

                        {vendorType == "Music" ?
                            <>
                                {genreReduxObject.length > 0 ?
                                    <>
                                        <ModalDropDownComponent
                                            readOnly
                                            onDropDownPress={() => {

                                                scrollRef.current.scrollToEnd({ animated: true });
                                            }}
                                            placeholder={"Please select genre"}
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
                                    value={equipment}
                                    onChange={(value) => setEquipment(value)}
                                />

                            </>
                            : null}

                        {vendorType == "Security" ?
                            <>
                                {certificationReduxObject.length > 0 ?
                                    <>
                                        <ModalDropDownComponent
                                            readOnly
                                            onDropDownPress={() => {

                                                scrollRef.current.scrollToEnd({ animated: true });
                                            }}
                                            placeholder={"Please select certification"}
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

                        {vendorType == "Food" ?
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
                        {vendorType != "Food" &&
                            vendorType != "Security" &&
                            vendorType != "Music" ?
                            <>
                                <FloatingInput
                                    floatingLabel={"Services"}
                                    onChange={(value) => setServices(value)}
                                    value={services}
                                />
                            </>
                            : null
                        }

                    </View>
                    {/* <View style={{ height: 70 }}></View> */}
                    <View style={{ alignSelf: 'center', width: '95%', }}>
                        <CustomButton
                            complete
                            onPress={handleSubmit}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )}
    </Scaffold>
    )
}
VendorMarketProfile.routeName = "/VendorMarketProfile";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        flex: 1
    },


    ButtonStyle2: {
        backgroundColor: '#212121',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 22,
        paddingVertical: 20,
        marginVertical: 10
    },
    ContainerStyle: {
        width: '100%',
        marginVertical: 4,
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingVertical: 10,
    },
    Title1Style: {
        fontSize: 18,
        opacity: 0.7,
        color: '#fff',
        fontFamily: 'AvenirNext-Regular',
    },
    Title2Style: {
        fontSize: 17,
        // opacity:0.8,
        // fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'AvenirNext-Regular',
    },
    TitleStyle: {
        fontSize: 16,
        paddingVertical: 5,
        fontFamily: 'AvenirNext-Regular',
    },

})

