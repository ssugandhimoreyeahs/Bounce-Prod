import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import {
    BouncePro,
    RightWhite,
} from '@assets'
import { DoubleTextButton } from '@components';

export default function Subscription3(props) {

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{ padding: 10 }}>
                    <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                        <Text style={styles.correctTextStyle}>Payment Method</Text>
                        <View style={styles.subContainer}>
                            <Text style={styles.insideTextStyle}>ending in 1369</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                        <Text style={styles.correctTextStyle}>Next Payment</Text>
                        <View style={styles.subContainer}>
                            <Text style={styles.insideTextStyle}>Your subscription will renew for $12 on February 1, 2021</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                        <Text style={styles.correctTextStyle}>Advanced Controls</Text>
                        <View style={[styles.subContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.insideTextStyle}>My Membership</Text>
                            <Image source={RightWhite} />
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        // justifyContent:'space-around'
    },
    subContainer: {
        minHeight:70,
        borderWidth: 1,
        borderColor: '#00ABFF',
        marginVertical: 10,
        backgroundColor: "#016A9E",
        // backdrop: blur(44px)
        /* Note: backdrop-filter has minimal browser support */
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 18,
        padding: 10
    },
    lastLine: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.4
    },
    headerView: {
        width: '70%',
        alignSelf: 'center',
        padding: 10
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    insideTextStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        // letterSpacing: 0.6,
        // textAlign: 'left',
        // lineHeight: 28,
        // opacity: 0.9  
    },
    correctTextStyle: {
        color: "#FFFFFF",
        fontSize: 24,
        letterSpacing: 0.6,
        textAlign: 'left',
        lineHeight: 28,
        // opacity: 0.9
    },
    eventTitleStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 28,
        opacity: 0.9
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 22,
        paddingVertical: 20,
        marginVertical: 10
    },
    Title1Style: {
        fontSize: 18,
        opacity: 0.8,
        color: '#fff'
    },
    Title2Style: {
        fontSize: 22,
        // opacity:0.8,
        fontWeight: 'bold',
        color: '#fff'
    },
})