import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { IconTitle, Root, BlueCard, BlackCard, Footer, ModalPopup } from '@components'

import {
    StarPerson,
    Girl,
    Message,
    WhiteDownload,
    DJ,
} from '@assets'
import { Avatar } from 'react-native-elements'
import { FONTSIZE } from '@utils'
import { WhiteCalender, Scanner } from '@svg'

const EVENTS = [{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: DJ,
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: DJ,
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: DJ,
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
{
    icon: Girl,
    name: "Jennifer Anniston",
    pictures: DJ,
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
    location: "8440 W. Lake Mead Blvd., Las Vegas, NV, 89128"
},
]


export default function PartyRental() {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.renderContainer}>

                <View style={[styles.flexDirectionStyle, { padding: 15 }]}>
                    <Avatar source={item.icon} size="medium" rounded />
                    <Text style={[styles.name, { marginLeft: 10 }]}>{item.name}</Text>
                </View>

                <Image source={item.pictures} style={{ width: '100%' }} />

                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={[styles.name, { paddingVertical: 15 }]}>{item.name}</Text>

                    <View style={[styles.flexDirectionStyle, { justifyContent: 'space-between' }]}>
                        <View style={[styles.mapStyle, styles.flexDirectionStyle,]}>
                            <WhiteCalender height={28} width={28} />
                            <Text style={[styles.textStyle1]}>{item.time}</Text>
                        </View>
                        <View style={[styles.mapStyle, styles.flexDirectionStyle]}>
                            <Scanner height={28} width={28} />
                            <Text style={[styles.textStyle1]}>Scan</Text>
                        </View>
                    </View>

                    <View style={[styles.mapStyle, { alignItems: 'center', marginVertical: 10 }]}>
                        <Text style={[styles.mapText]}>{item.location}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <Root>
            <View style={styles.container}>
            <Text style={[styles.headingStyle,{color:'#999999',letterSpacing:0.7}]}>{"No upcoming event's available."}</Text>
                {/* <ScrollView>
                    <Text style={styles.headingStyle}>Upcoming Events</Text>
                    <FlatList
                        data={EVENTS}
                        renderItem={renderItem}
                        keyExtractor={index => index.toString()}
                    />
                </ScrollView> */}
            </View>
        </Root>
    )
}

PartyRental.routeName = "/PartyRental";

const styles = StyleSheet.create({
    textStyle1: {
        fontSize: FONTSIZE.Text18,
        color: '#000',
        marginLeft: 5
    },
    mapStyle: {
        padding: 10,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    renderContainer: {
        // flex:1
        backgroundColor: '#fff',
        marginBottom: 10,
        width: '100%',
        paddingVertical: 10
    },
    headingStyle: {
        // backgroundColor: '#fff',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingVertical: 15
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: "#000000",
        fontSize: FONTSIZE.Text20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#ECF1F4',
        justifyContent:'center',
        alignItems:'center'
    },    
    
    mapText: {
        color: "#1FAEF7",
        fontSize: FONTSIZE.Text12,
        paddingVertical: 8
    },
  
})
