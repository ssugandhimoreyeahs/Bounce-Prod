import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import {
    GreyToggle
} from '@assets'
import { DoubleTextButton } from '@components';
import { Avatar } from 'react-native-elements'

export default function Subscription3(props) {

    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <View>
                    <Text style={styles.correctTextStyle}>Notify Before Renewing</Text>
                    <Text style={styles.smallTextStyle}>Send a reminder 1 day before renewal</Text>
                </View>
                <Image source={GreyToggle}  />
            </View>
            <View style={styles.cardStyle}>
                <View>
                    <Text style={styles.correctTextStyle}>End Membership</Text>
                    <Text style={styles.smallTextStyle}>By ending your membership you will lose access to all Bounce Pro benefits</Text>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        padding: 5
    },
    cardStyle: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#494949',
        borderRadius: 18,
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 20
    },
    smallTextStyle: {
        color: "#FFFFFF",
        fontSize: 14,
        // textAlign: 'center',
        lineHeight: 20,
        opacity: 0.7
    },
    headingBelowText: {
        color: "#FFFFFF",
        fontSize: 22,
        letterSpacing: 2.1,
        // lineHeight: 28,
        opacity: 0.8
    },
    subContainerProduct: {
        marginVertical: 10,
        // backgroundColor: "#292929",
        alignItems: 'center',
        // borderRadius: 30,
        paddingVertical: 20
    },
    subContainer: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#00ABFF',
        marginVertical: 20,
        backgroundColor: "#016A9E",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        padding: 10,
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
    },
    correctTextStyle: {
        color: "#FFFFFF",
        fontSize: 20,
        marginBottom: 5,
        letterSpacing: 0.6,
        lineHeight: 28,
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