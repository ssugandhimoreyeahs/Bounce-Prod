import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {
    Header,
    PhoneNumber,
    ModalDropDownComponent,
    Scaffold,
    CustomButton,
    FloatingInput
} from '@components'
import { FONTSIZE, getHp, getWp } from '@utils'
import { Toast } from '@constants';
import MobxStore from '../../mobx';
import { ApiClient } from '../../app/services';
import Modal from 'react-native-modal';


export default function AccountSetting(props) {
    const { userProfile: userinfo } = MobxStore.authStore;

    const token = userinfo?.token;
    const user = userinfo?.user;
    // console.log("User data of user--->", user.countryCode)
    const scrollRef = useRef();
    const [loader, setLoader] = useState(true);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState({ codes: [] })
    const [code, setCode] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        MobxStore.authStore.async.reloadUser();
    }, [MobxStore.authStore.userProfile]);

    useEffect(() => {
        setData();
    }, []);

    const setData = async () => {

        const Country_Code = await ApiClient.authInstance
            .get(ApiClient.endPoints.countryCode)
        // console.log("countryCODES-->", JSON.stringify(Country_Code));

        setCountryCode(Country_Code.data)
        setCode(JSON.parse(user?.countryCode))
        setUsername(user?.username);
        setPhone(user?.phoneNumber);
        setEmail(user?.email);
        setLoader(false);
    };


    // console.log("code", code)

    const handleSubmit = async () => {
        setLoader(true);

        if (!(phone.length < 11)) {
            setLoader(false);
            return Toast('Please enter valid phone number !');
        }

        let formData = new FormData();
        formData.append('username', username);
        formData.append('phoneNumber', phone);
        formData.append('email', email);
        formData.append('countryCode', JSON.stringify(code));

        await ApiClient.authInstance
            .post(ApiClient.endPoints.postUser, formData)
            .then(async i => {
                MobxStore.authStore.async.reloadUser();
                console.log(i);
                if (i.status == 201 || i.status == 200) {
                    setLoader(false);
                    setTimeout(() => {
                        Toast('Account Updated Successfully!');
                        props.navigation.goBack();
                    }, 100);
                }
            })
            .catch(e => {
                console.log(e);
                setLoader(false);
            });
        setLoader(false);
    };

    const handleCountryCode = (item) => {
        // console.log("Code is :", item)
        setModalVisible(!isModalVisible)
        setCode(item)
    }

    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#FBFBFB' }}>
        {!loader && (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={{ backgroundColor: '#FBFBFB' }}
                ref={scrollRef} >

                <Header
                    headerBackColor={{
                        backgroundColor: '#FBFBFB',
                        elevation: 0
                    }}
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
                        editable={false}
                        custom
                        floatingLabel={"Username"}
                        onChange={value => setUsername(value)}
                        value={username == 'null' ? '' : username}
                    />
                    <Text style={styles.alertText}>{"Username cannot be changed!"}</Text>


                    <Modal isVisible={isModalVisible}
                        style={{ backgroundColor: '#fff', }}
                        presentationStyle={'pageSheet'}
                    >

                        {countryCode?.length == 241 &&
                            <View style={{ width: '100%' }}>
                                <Text style={styles.countryTitle}>
                                    {"Country Code"}
                                </Text>
                                <ScrollView style={{ height: '90%' }}
                                    contentContainerStyle={{}}>
                                    {
                                        countryCode.map((item, index) => {
                                            return (
                                                <TouchableOpacity style={{
                                                    margin: getHp(4),
                                                    flexDirection: 'row', alignItems: 'center'
                                                }}
                                                    key={index}
                                                    onPress={() => handleCountryCode(item)}
                                                >
                                                    <Text style={{
                                                        fontSize: FONTSIZE.Text14,
                                                        width: '10%',
                                                        marginLeft: getWp(10)
                                                    }}>{item.flag}</Text>

                                                    <Text style={{ fontSize: FONTSIZE.Text14, width: '20%', marginHorizontal: getWp(5) }}>{item.dial_code}
                                                    </Text>

                                                    <Text style={{ fontSize: FONTSIZE.Text14 }}>
                                                        {item.name}</Text>
                                                </TouchableOpacity>

                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        }
                    </Modal>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.countryField}
                            onPress={() => setModalVisible(!isModalVisible)}
                        >
                            <Text style={[code ? { color: '#000000' } : { color: '#999999' }, { fontFamily: 'AvenirNext-Medium', fontSize: FONTSIZE.Text17 }]}>
                                {code == '' ? "Code" : code?.dial_code}
                            </Text>
                        </TouchableOpacity>

                        <View style={{ width: '77%' }}>
                            <FloatingInput
                                keyboardType={"numeric"}
                                custom
                                floatingLabel={"Phone Number"}
                                onChange={value => setPhone(value)}
                                value={phone == 'null' ? '' : phone}
                            />
                        </View>

                    </View>



                    <FloatingInput
                        custom
                        floatingLabel={"Email"}
                        onChange={(value) => setEmail(value)}
                        value={email == 'null' ? '' : email}
                    />
                    {/* <PhoneNumber /> */}
                </View>


                <View style={{ paddingHorizontal: getWp(10), paddingBottom: 80 }}>
                    <CustomButton
                        complete
                        bar
                        onPress={handleSubmit}
                        ButtonTitle={'Save Changes'}
                    />
                </View>
            </ScrollView>
        )}
    </Scaffold>
    )
}
AccountSetting.routeName = "/AccountSetting";
const styles = StyleSheet.create({
    countryTitle: {
        fontSize: FONTSIZE.Text16,
        marginVertical: getHp(10),
        marginLeft: getWp(10),
        fontFamily: 'AvenirNext-Medium'
    },
    alertText: {
        fontFamily: 'AvenirNext-Italic',
        fontSize: FONTSIZE.Text11,
        marginLeft: getWp(5),
        marginTop: getHp(-8)
    },
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

    },
    countryField: {
        height: getHp(58),
        borderRadius: 9.5,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
        width: '20%',
        marginRight: getWp(10),
        justifyContent: 'center',
        alignItems: 'center'
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
