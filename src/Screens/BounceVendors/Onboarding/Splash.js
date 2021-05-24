import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BounceProLogo, BounceSplash } from '@svg'
import { observer } from 'mobx-react';

function SplashScreen(props) {
    // useEffect(() => {
    //     if (authStore.isAutoLoginDone && authStore.isAuthenticated) {
    //         // console.log('I_AM_HERE_AUTH - ',);
    //         console.log('authSTore_SER-CHE - ', JSON.stringify(authStore.userProfile));
    //         if (authStore.userProfile.user.vendorType == 2) {
    //             props.navigation.replace('UserFriendsProfile');
    //         }else {
    //             props.navigation.replace("btmstack", {
    //                 screen: "DjProfileScreen",
    //             });
    //         } 

    //     } else if (authStore.isAutoLoginDone == true && authStore.isAuthenticated == false) {
    //         props.navigation.replace('LoginScreen');
    //     }
    // }, [authStore.isAutoLoginDone, authStore.isAuthenticated]); 
    return (
        <View style={styles.container}>
            <BounceSplash preserveAspectRatio='none' height={170} width={238} />

        </View>
    )
}
SplashScreen.routeName = "/SplashScreen";

export default observer(SplashScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})