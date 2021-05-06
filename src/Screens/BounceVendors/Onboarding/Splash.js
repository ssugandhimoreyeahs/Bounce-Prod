import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BounceProLogo, BounceSplash } from '@svg'
import MobxStore from '../../../mobx';
import { observer } from 'mobx-react';
import {useDispatch} from 'react-redux';
import { getData } from '../../../FetchServices';
import { fetchCurrentLoginData } from '../../../reducer/CurrentData';

function SplashScreen(props) {
    const dispatch = useDispatch();
    const {
        authStore
    } = MobxStore;
    useEffect(() => {
        authStore.async.autoLogin(true);
        fetchData();
    }, []);
    useEffect(() => {
        if (authStore.isAutoLoginDone && authStore.isAuthenticated) {
            // console.log('I_AM_HERE_AUTH - ',);
            console.log('authSTore_SER-CHE - ', JSON.stringify(authStore.userProfile));
            if (authStore.userProfile.user.vendorType == 2) {
                props.navigation.replace('UserFriendsProfile');
            }else {
                props.navigation.replace("btmstack", {
                    screen: "DjProfileScreen",
                });
            } 
            
        } else if (authStore.isAutoLoginDone == true && authStore.isAuthenticated == false) {
            props.navigation.replace('LoginScreen');
        }
    }, [authStore.isAutoLoginDone, authStore.isAuthenticated]);



    const fetchData = async () => { 

        let LANGUAGE_SERVER = await getData('language')
        dispatch(fetchCurrentLoginData(["ORIGINAL_LANG", LANGUAGE_SERVER]))
        let tempLanguage = []
        await LANGUAGE_SERVER.map((item) => {
            tempLanguage.push({ label: item.name, value: item.id, code: item.code })
        })
        dispatch(fetchCurrentLoginData(["LANGUAGE_ARRAY", tempLanguage]))


        let GENRE_SERVER = await getData('genres')
        dispatch(fetchCurrentLoginData(["ORIGINAL_GENRE", GENRE_SERVER]))
        let tempGenre = []
        await GENRE_SERVER.map((item) => {
            tempGenre.push({ label: item.name, value: item.id })
        })
        dispatch(fetchCurrentLoginData(["GENRE_ARRAY", tempGenre]))
 

        let GUARD_CERTIFICATION_SERVER = await getData('genres/guardcertification')
        dispatch(fetchCurrentLoginData(["ORIGINAL_CERTI", GUARD_CERTIFICATION_SERVER]))
        let tempCERTIFICATION = []
        await GUARD_CERTIFICATION_SERVER.map((item) => {
            tempCERTIFICATION.push({ label: item.name, value: item.id })
        })
        dispatch(fetchCurrentLoginData(["CERTIFICATION_ARRAY", tempCERTIFICATION])) 
    }
    return (
        <View style={styles.container}>
            <BounceSplash />
        </View>
    )
}

export default observer(SplashScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})