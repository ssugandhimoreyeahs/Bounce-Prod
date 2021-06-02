import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { QRCodes, Header, CustomButton } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { UploadBlue } from '@svg'

export default function AboutUs() {
    return (<SafeAreaView style={styles.container}>
        <Header headerTitle={"About Bounce"}
            back
            onPress={() => navigation.goBack()}
        />
        <View style={styles.subContainer}>

            <Text style={[styles.textStyle, { alignSelf: 'center', marginTop: 20,marginBottom:10 }]} >
                {"With your support, we’ll keep working to bring you closer to the places and people you love."}
            </Text>

            <TouchableOpacity style={[styles.allFrnds,{marginVertical:20}]}>
                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text15, fontFamily: 'AvenirNext-Bold', color: '#1FAEF7' }]}>
                    {"Help spread the love"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.allFrnds,{elevation:1,marginTop:20,alignItems:'flex-start',height:68}]}>
                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text18, fontFamily: 'AvenirNext-Medium',marginLeft:20 }]}>
                    {"User Agreement"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.allFrnds,{elevation:1,marginTop:10,alignItems:'flex-start',height:68}]}>
                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text18, fontFamily: 'AvenirNext-Medium',marginLeft:20 }]}>
                    {"Privacy Policy"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.allFrnds,{elevation:1,marginTop:10,alignItems:'flex-start',height:68}]}>
                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text18, fontFamily: 'AvenirNext-Medium',marginLeft:20 }]}>
                    {"End User Licence Agreement"}
                </Text>
            </TouchableOpacity>

        </View>
    </SafeAreaView>
    )
}
AboutUs.routeName = "/AboutUs";
const styles = StyleSheet.create({
    QRcontainer: {
        elevation: 5,
        padding: 30,
        borderRadius: 42,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    textStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text15,
        lineHeight: 20

    },
    allFrnds: {
        width: '100%',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 2,
        backgroundColor: '#FFFFFF',
        height: 46
    },
});
