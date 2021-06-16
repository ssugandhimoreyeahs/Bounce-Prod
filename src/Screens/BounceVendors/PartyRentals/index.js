import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { IconTitle, Root, BlueCard, BlackCard, Footer, ModalPopup } from '@components'

import {
    StarPerson,
    Girl,
    Message,
    WhiteDownload,
    DJ,
    CoverPhoto
} from '@assets'
import { Avatar } from 'react-native-elements'
import { FONTSIZE,getWp } from '@utils'
import { WhiteCalender, Scanner, DirectionBlue } from '@svg'
import { getHp } from '../../../app/utils'
import { Scaffold } from '../../../components'

const EVENTS = [{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: CoverPhoto,
    partyType: "Homecoming Party",
    time: "Dec 31, 8:00 PM",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: CoverPhoto,
    partyType: "Homecoming Party",
    time: "Dec 31, 8:00 PM",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: CoverPhoto,
    partyType: "Homecoming Party",
    time: "Dec 31, 8:00 PM",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: CoverPhoto,
    partyType: "Homecoming Party",
    time: "Dec 31, 8:00 PM",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
]


export default function PartyRental() {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.renderContainer}>

                <View style={[styles.flexDirectionStyle,
                { padding: 10 }]}>
                    <Avatar source={item.icon} size={30} rounded />
                    <Text style={[styles.name, { marginLeft: 10 }]}>{item.name}</Text>
                </View>

                <Image source={CoverPhoto} style={{ height: 375, width: '100%' }} />

                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.name, { paddingVertical: 15 }]}>{item.name}</Text>

                    <View style={[styles.flexDirectionStyle, { justifyContent: 'space-between' }]}>
                        <View style={[styles.mapStyle, styles.shadowStyle, styles.flexDirectionStyle,]}>
                            <WhiteCalender height={getHp(26)} width={getWp(24)} />
                            <Text style={[styles.textStyle1]}>
                                {item.time}
                            </Text>
                        </View>

                        <View style={[styles.mapStyle, styles.shadowStyle, styles.flexDirectionStyle]}>
                            <Scanner height={getHp(20)} width={getWp(20)} />
                            <Text style={[styles.textStyle1]}>{"Scan"}</Text>
                        </View>
                    </View>

                    <View style={[styles.mapStyle, styles.shadowStyle, { alignItems: 'center', marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row' }]}>
                        <DirectionBlue height={getHp(24)} width={getWp(24)} />
                        <Text style={[styles.mapText, { marginLeft: 25, textDecorationLine: 'underline' }]}>{item.location}</Text>
                    </View>

                    <View style={[styles.mapStyle, styles.shadowStyle, { alignItems: 'center', justifyContent: 'center', marginVertical: 5 }]}>
                        <Text style={[styles.mapText, { fontSize: FONTSIZE.Text18 }]}>
                            {"Request Payment"}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <Scaffold  statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.container}>
                {/* <Text style={[styles.headingStyle,{color:'#999999',letterSpacing:0.7}]}>{"No upcoming event's available."}</Text> */}
                <ScrollView>
                    <Text style={styles.headingStyle}>{"Upcoming Events"}</Text>
                    <FlatList
                        data={EVENTS}
                        renderItem={renderItem}
                        keyExtractor={index => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
        </Scaffold>
    )
}

PartyRental.routeName = "/PartyRental";

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,

    },
    textStyle1: {
        fontSize: FONTSIZE.Text18,
        color: '#000',
        marginLeft: 10,
        fontFamily: 'AvenirNext-Regular',
        letterSpacing: 0.1
    },
    mapStyle: {
        height: getHp(50),
        elevation: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    renderContainer: {
        // flex:1
        backgroundColor: '#fff',
        marginBottom: 15,
        // width: '100%',
        // paddingBottom:10,
        paddingVertical: 10
    },
    headingStyle: {
        // marginVertical:getHp(5),
        letterSpacing: 0.4,
        color: '#000',
        fontSize: 20,
        fontFamily: 'AvenirNext-DemiBold',
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: "#000000",
        fontSize: FONTSIZE.Text20,
        fontFamily: 'AvenirNext-Medium',
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 40,
    },

    mapText: {
        color: "#1FAEF7",
        fontSize: FONTSIZE.Text12,
        paddingVertical: 8
    },

})
