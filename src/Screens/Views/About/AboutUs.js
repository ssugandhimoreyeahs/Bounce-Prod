import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { QRCodes, Header, Scaffold } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { UploadBlue } from '@svg'

export default function AboutUs(props) {
    return (<Scaffold>
        <SafeAreaView style={styles.container}>

            <Header headerTitle={"About Bounce"}
                headerStyleProp={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: FONTSIZE.Text24,
                    fontWeight: 'normal'
                }}
                headerBackColor={{ backgroundColor: '#FBFBFB', }}
                back
                onPress={() => props.navigation.goBack()}
            />

            <View style={styles.subContainer}>

                <Text style={[styles.textStyle, {
                    fontFamily: 'AvenirNext-Regular',
                    fontSize: FONTSIZE.Text15,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    lineHeight: 20
                }]} >
                    {"With your support, we’ll keep working to bring you closer to the places and people you love."}
                </Text>

                <TouchableOpacity style={[styles.allFrnds,
                styles.shadowStyle,
                {
                    shadowRadius: 5,
                    width: '90%',
                    borderRadius: 15,
                    marginVertical: 20,

                }]}>
                    <Text style={[styles.textStyle, {
                        fontSize: FONTSIZE.Text16,
                        color: '#1FAEF7'
                    }]}>
                        {"Help spread the love"}
                    </Text>
                </TouchableOpacity>



                <TouchableOpacity style={[styles.allFrnds, styles.shadowStyle, { elevation: 1, marginTop: 20, alignItems: 'flex-start', height: 68 }]}>
                    <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                        {"User Agreement"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.allFrnds, styles.shadowStyle, { elevation: 1, marginTop: 5, alignItems: 'flex-start', height: 68 }]}>
                    <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                        {"Privacy Policy"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.allFrnds, styles.shadowStyle, { elevation: 1, marginTop: 5, alignItems: 'flex-start', height: 68 }]}>
                    <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                        {"End User Licence Agreement"}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    </Scaffold>
    )
}
AboutUs.routeName = "/AboutUs";
const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        // width: '95%'
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
        fontSize: FONTSIZE.Text18,
        letterSpacing: 0.3,
        fontFamily: 'AvenirNext-Medium',
    },
    allFrnds: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 2,
        backgroundColor: '#FFFFFF',
        height: 46
    },
});
