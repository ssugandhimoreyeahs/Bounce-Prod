import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { QRCodes, Header, CustomButton } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { UploadBlue } from '@svg'

export default function DesignCanva() {
    return (<View style={styles.container}>
        <Header headerTitle={"Custom Invitation"}
            back
            onPress={() => navigation.goBack()}
        />
        <View style={styles.subContainer}>

            <Text style={[styles.textStyle, { alignSelf: 'center', marginBottom: 10, fontFamily: 'ANB', fontSize: FONTSIZE.Text22 }]} >
                {"Adelson School Gala"}
            </Text>
            <Text style={[styles.textStyle, { alignSelf: 'center', marginBottom: 10 }]} >
                {"Dec 31, 8:00 PM"}
            </Text>

            <Text style={[styles.textStyle, { textDecorationLine: 'underline', fontSize: FONTSIZE.Text14, fontFamily: '500', color: '#1FAEF7' }]}>
                {"8440 W. Lake Mead Blvd., Las Vegas,... "}
            </Text>

        </View>


        <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={[{ height: 56, borderRadius: 10, justifyContent: 'center', elevation: 2, backgroundColor: '#7B41E4', width: '80%' }]}>
                <Text style={[{ fontSize: FONTSIZE.Text22, color: '#FDFCFD', alignSelf: 'center' }]} >
                    {"Design with Canva"}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}
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
        paddingTop: 80,
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
        fontSize: FONTSIZE.Text16,
        marginTop: 20,

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

DesignCanva.routeName = '/DesignCanva'