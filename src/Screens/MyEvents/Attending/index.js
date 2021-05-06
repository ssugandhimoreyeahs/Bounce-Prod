import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import {
    Girl
} from '@assets'
import { AddButton, ThreeDots } from '@assets';

const DATA = [{
    eventTitle: "Saturday, December 19",
    name: 'School of California',
    address: "9700 Hillpointe Rd.",
    time: "7:00 PM - 11:00 PM",
    rightIcon: { ThreeDots }
},
{
    eventTitle: "Saturday, December 19",
    name: 'School of California',
    address: "9700 Hillpointe Rd.",
    time: "7:00 PM - 11:00 PM",
    rightIcon: { ThreeDots }
}
]
export default function HostingNoEvents(props) {
    const flatlist = ({ item,index }) => {
        return (
            <View style={{ marginBottom: 10 }}>
                <View style={styles.headerView}>
                    <Text style={styles.eventTitleStyle}>{item.eventTitle}</Text>
                </View>
                <View style={[styles.flexDirectionStyle, { margin: 10 }]}>
                    <View style={styles.flexDirectionStyle}>
                        <View style={{ height: 80, width: 100, marginRight: 10 }}>
                            <Image source={Girl} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
                        </View>
                        <View style={{ paddingVertical: 5 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.commentLineTextStyle}>{item.address}</Text>
                            <Text style={styles.commentLineTextStyle}>{item.time}</Text>
                        </View>
                    </View>
                    <Image source={ThreeDots} />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={flatlist}
                key={index => index}
                keyExtractor={index => index}
            />
            <Image source={AddButton} style={{ position: 'absolute', margin: 10, right: 10, bottom: 10 }} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    headerView: {
        backgroundColor: '#242424',
        padding: 10
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    eventTitleStyle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: 'bold'
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold'
    },
    commentLineTextStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        opacity: 0.7,
        marginTop: 0
    },

})