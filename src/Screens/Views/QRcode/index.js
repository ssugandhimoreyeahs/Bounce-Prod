import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from 'react-native'
import { QRCodes, Header, CustomButton } from '@components';
import { UserContext } from "../../../context/profiledataProvider";
import { FONTSIZE, getHp, getWp } from '@utils'

export default function QRcode({ navigation }) {
    const { loader, userinfo, fetchProfile } = useContext(UserContext);
    return (
        <View style={styles.container}>
            <Header
                back
                onPress={() => navigation.goBack()}
                theme={'#fff'}
                HeaderBackColor={{ backgroundColor: "#000" }}
            />

            <View style={styles.subContainer}>
                <View style={styles.QRcontainer}>
                    <QRCodes
                        value={"1"}
                        size={200}
                        qrUserPic={userinfo?.user?.profileImage?.filePath}
                    />
                </View>
            </View>
            <View style={[styles.barStyle]} />
        </View>
    )
}
const styles = StyleSheet.create({
    barStyle: {
        height: getHp(5),
        backgroundColor: '#fff',
        marginBottom: getHp(5),
        marginTop: getHp(10),
        width: getWp(134),
        alignSelf: 'center',
        borderRadius: 100
    },
    QRcontainer: {
        elevation: 5,
        padding: 30,
        borderRadius: 42,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#000',
    },

})
