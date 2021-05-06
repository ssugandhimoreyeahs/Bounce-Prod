import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import {
    BouncePro,
    RightWhite,
    Girl,
    RightBlue,
    DJ,
    YellowStar
} from '@assets'
import { DoubleTextButton } from '@components';
import { Avatar } from 'react-native-elements'

export default function Subscription3(props) {

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Avatar
                            source={DJ}
                            size='xlarge'
                            rounded
                        />
                        <View style={{ alignItems: 'center',paddingLeft:10 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 22, }}>Alexis Sears</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                                <Image source={YellowStar} />
                                <Text style={{ color: '#FFFFFF', fontSize: 16, marginLeft: 5 }}>4.9</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.subContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                        <Text style={styles.insideTextStyle}>My Membership</Text>
                        <Image source={RightWhite} />
                    </View>

                    <View style={styles.subContainerProduct}>
                        <View >
                            <Image source={BouncePro} />
                            <View style={{ position: 'absolute', bottom: 30, right: 30 }}>
                                <Text style={styles.headingBelowText}>Member</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
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
        backgroundColor: '#212121',
    },
    headingBelowText:{
        color: "#FFFFFF",
        fontSize: 22,
        letterSpacing: 2.1,
        // lineHeight: 28,
        opacity:0.8
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
        fontSize: 18,
        width: '70%',
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