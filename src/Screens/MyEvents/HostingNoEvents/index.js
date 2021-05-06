import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, SearchBar, CustomButton } from '@components'
import { AddButton } from '@assets';

export default function HostingNoEvents() {
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.offerCardContainer}>
                <View style={styles.offerCardView}>
                    <Text style={styles.percentTextStyle}>5%</Text>
                </View>
                <Text style={styles.offAnyOrder}>OFF ANY ORDER</Text>
                <Text style={styles.upto300}>Up to $300</Text>

                <CustomButton
                    Pay
                    ButtonTitle={"Reedem Now"}
                    ContainerStyle={styles.ContainerStyle}
                    ButtonStyle={styles.ButtonStyle}
                    TitleStyle={styles.TitleStyle}
                />
            </View>
            <View style={styles.bodyView}>
                <Text style={styles.simppleBodyText}>You aren’t hosting any events. Select the plus (+) icon to host an event!
                </Text>
            </View>
            </ScrollView>
            <Image source={AddButton} style={{ position: 'absolute', margin: 10, right: 10, bottom: 10 }} />
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    bodyView: {
        flex: 1,
        justifyContent: 'center',
        minHeight:250
    },
    offerCardContainer: {
        backgroundColor: 'rgba(1, 106, 158, 0.24)',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingVertical: 10
    },
    offAnyOrder: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginVertical: 5
    },
    upto300: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: 'normal',
        marginVertical: 5
    },
    simppleBodyText: {
        letterSpacing: 0.03,
        textAlign: 'center',
        opacity: 0.8,
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: 'normal',
        marginVertical: 5
    },
    offerCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 50,
        width: 50,
        marginVertical: 10
    },
    percentTextStyle: {
        // backgroundColor: '#FFFFFF',
        // borderRadius:50
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold'
    },
    ContainerStyle: {
        // width: '100%',
        marginVertical: 10
    },
    ButtonStyle: {
        paddingHorizontal: 0,
        backgroundColor: '#292929',
        borderRadius: 12,
        width: '100%',
    },
    TitleStyle: {
        fontSize: 18,
        color: '#1FAEF7'
    },
})