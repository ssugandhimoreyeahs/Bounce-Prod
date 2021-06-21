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



export default function AccountSetting(props) {
    const { userProfile: userinfo } = MobxStore.authStore;

    const token = userinfo?.token;
    const user = userinfo?.user;
    const scrollRef = useRef();
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState({ codes: [] })

    useEffect(() => {
        MobxStore.authStore.async.reloadUser();
        setData();
    }, []);

    const setData = async () => {

        setLoader(true);
        const Country_Code = await ApiClient.authInstance
            .get(ApiClient.endPoints.countryCode)
        console.log("countryCODES-->", JSON.stringify(Country_Code));

        setCountryCode(Country_Code.data)
        setUsername(user?.username);
        setPhone(user?.phoneNumber);
        setEmail(user?.email);
        setLoader(false);
    };


    const handleSubmit = async () => {
        setLoader(true);

        let formData = new FormData();
        formData.append('username', username);
        formData.append('phoneNumber', phone);
        formData.append('email', email);

        // console.log('username', username);
        // console.log('phoneNumber', phone);
        // console.log('email', email);
        // console.log('TOKEN', token);

        await ApiClient.authInstance
            .post(ApiClient.endPoints.postUser, formData)
            .then(async i => {
                MobxStore.authStore.async.reloadUser();
                console.log(i);
                if (i.status == 201 || i.status == 200) {
                    setLoader(false);
                    setTimeout(() => {
                        Toast('Profile Updated Successfully!');
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

                    {/* {countryCode?.length !== 0 &&
                        <View style={{ width: '25%' }}>
                            <ScrollView style={{ height: 150 }}
                                contentContainerStyle={{}}>
                                {
                                    countryCode.map((item) => {
                                        return (
                                            <TouchableOpacity>
                                                <Text>{item.flag} {item.dial_code}</Text>
                                            </TouchableOpacity>

                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    } */}

               
                    {/* <ModalDropDownComponent
                            readOnly
                            onDropDownPress={() => {
                                scrollRef.current.scrollToEnd({ animated: true });
                            }}
                            placeholder={"Code"}
                            options={countryCode}
                            labelProp={'name'}
                            uniqueProp={'id'}
                            onSelectItems={item => {
                                setCountryCode({ codes: item })
                            }}
                        /> */}
             

                    
                            <FloatingInput
                                custom
                                floatingLabel={"Phone Number"}
                                onChange={value => setPhone(value)}
                                value={phone == 'null' ? '' : phone}
                            />
                     



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
