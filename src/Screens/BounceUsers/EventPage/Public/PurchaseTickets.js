import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { BlueCheck, Header, Scaffold, CustomText } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { UploadBlue } from '@svg'
import LinearGradient from 'react-native-linear-gradient';


const DATA = [
    {
        heading: 'GA',
        subTitle: '$60 + 3%',
        description: 'The General Admission experience is your gateway into Life is Beautiful and includes access to all of the sights, tastes, and sounds of our four stages...  '
    },
    {
        heading: 'GA',
        subTitle: '$60 + 3%',
        description: 'The General Admission experience is your gateway into Life is Beautiful and includes access to all of the sights, tastes, and sounds of our four stages... '
    },
    {
        heading: 'GA',
        subTitle: '$60 + 3%',
        description: 'The General Admission experience is your gateway into Life is Beautiful and includes access to all of the sights, tastes, and sounds of our four stages... '
    },
]

export default function PurchaseTickets(props) {

    const renderItem = ({ item }) => {
        const {
            heading,
            subTitle,
            description
        } = item
        return (
            <TouchableOpacity style={[styles.allFrnds, styles.shadowStyle, {}]}>

                <View style={styles.flexStyle}>
                    <Text style={[styles.textStyle, { fontFamily: 'AvenirNext-DemiBold', }]}>
                        {heading}
                    </Text>
                    <BlueCheck />
                </View>

                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text16, marginVertical: getHp(10) }]}>
                    {subTitle}
                </Text>

                <CustomText
                    TextData={description}
                    styleProp={{
                        lineHeight: 19,
                        color: '#000',
                        fontFamily: 'AvenirNext-Medium',
                        fontSize: FONTSIZE.Text14,
                        marginTop: getHp(10),
                    }}
                />

            </TouchableOpacity>
        )
    }
    return (<Scaffold>

        <Header headerTitle={"Adelson School Gala"}
            headerStyleProp={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: FONTSIZE.Text24,
            }}
            headerBackColor={{ backgroundColor: '#FBFBFB', }}
            back
            onPress={() => props.navigation.goBack()}
        />
        <View style={styles.subContainer}>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={index => index}
            />

            {/* Footer View */}
            <View style={[styles.allFrnds,{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginVertical:0 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text22, marginVertical: getHp(10), fontFamily: 'AvenirNext-DemiBold', }]}>
                        {'GA'}
                    </Text>

                    <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text16, marginLeft: 10 }]}>
                        {'$41.20'}
                    </Text>
                </View>

                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#4FC3FF', '#00A7FD']}
                    style={[
                        styles.linearGradient,
                    ]}>
                    <TouchableOpacity >
                        <Text style={styles.buttonText}>{'Checkout'}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            {/* Footer View END*/}

        </View>
    </Scaffold>
    )
}
PurchaseTickets.routeName = "/PurchaseTickets";
const styles = StyleSheet.create({
    flexStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        // width: '95%'
    },
    buttonText: {
        letterSpacing: 0.4,
        fontFamily: 'AvenirNext-DemiBold',
        fontSize: FONTSIZE.Text14,
        textAlign: 'center',
        marginVertical: 10,
        color: '#fff',
    },
    linearGradient: {
        width: getWp(140),
        // height: getHp(40),
        borderRadius: 10,
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
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    textStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text22,
        // letterSpacing: 0.3,
        fontFamily: 'AvenirNext-Medium',
    },
    allFrnds: {
        // height: getHp(161),
        width: '100%',
        marginVertical: getHp(5),
        padding: 10,
        
        backgroundColor: '#FFFFFF',
    },
});
