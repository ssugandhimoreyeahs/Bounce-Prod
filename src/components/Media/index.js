import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import {
    Girl
} from '@assets'
import { ImageCarousel } from '@components'
import {
    AddButton, ThreeDots, DJ,
    DJ1,
    DJ2,
} from '@assets';
import { Download, Chat, BlackOutlineShare, Saved } from '@svg'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp } from '@utils'

const DATA = [{
    eventTitle: "Saturday, December 19",
    name: 'Nicole Silkman',
    address: "18 Mutual Friends",
    time: "7:00 PM - 11:00 PM",
    rightIcon: { ThreeDots }
},
{
    eventTitle: "Saturday, December 19",
    name: 'Nicole Silkman',
    address: "18 Mutual Friends",
    time: "7:00 PM - 11:00 PM",
    rightIcon: { ThreeDots }
}
]

const NEWSFEED = [{
    eventTitle: "Rich Little - Live in Las Vegas",
    name: 'Laugh Factory',
    // address: "18 Mutual Friends",
    time: "Dec 31, 8:00 PM",
    rightIcon: { ThreeDots }
},
{
    eventTitle: "Rich Little - Live in Las Vegas",
    name: 'Laugh Factory',
    // address: "18 Mutual Friends",
    time: "Dec 31, 8:00 PM",
    rightIcon: { ThreeDots }
}
]
export default function Media(props) {
    const {
        newsFeed = false,
        mainHeading = ''
    } = props
    const [state, setState] = useState(0)
    const imageArray = [DJ, DJ1, DJ2]
    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
        />
    }
    const flatlist = ({ item }) => {
        return (
            <View style={{ marginVertical: 15, }}>
                <View style={[styles.flexDirectionStyle, { padding: 10 }]}>
                    <View style={styles.flexDirectionStyle}>
                        <Avatar source={Girl} size={'medium'} rounded />
                        <View style={{ paddingVertical: 5, marginLeft: 15 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            {item.address ?
                                <Text style={styles.commentLineTextStyle}>{item.address}</Text>
                                : null}

                        </View>
                    </View>
                </View>
                {handleCarousel()}

                {newsFeed ?
                    <View style={{ paddingHorizontal: 10, marginTop: getHp(10) }}>
                        <Text style={styles.eventTitleStyle}>
                            {item.eventTitle}
                        </Text>
                        <View style={[styles.timeViewStyle, { paddingVertical: getHp(10) }]}>
                            <Text style={styles.timeStyle}>
                                {item.time}
                            </Text>
                            <View style={styles.downloadView}>
                                <Saved height={29} width={29} />
                                <BlackOutlineShare height={29} width={29} />
                            </View>
                        </View>
                    </View>
                    :
                    <>
                        <View style={styles.downloadView}>
                            <View style={{ alignItems: 'center' }}>
                                <Download height={30} width={30} />
                                <Text style={styles.counterText}>12</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Chat height={30} width={30} />
                                <Text style={styles.counterText}>2</Text>
                            </View>
                        </View>

                        <View style={styles.commentSection}>
                            <Text style={styles.name}>{item.name}
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                                    {"  😂😂 Right before Jessie got crushed by the dog"}
                                </Text>
                            </Text>
                            <Text style={[styles.name, { marginTop: 10, paddingLeft: 20 }]}>{item.name}
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                                    {"  @Skylar Dias Lmao"}
                                </Text>
                            </Text>
                        </View>
                    </>
                }

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: FONTSIZE.Text22, color: '#000', fontWeight: 'bold', paddingHorizontal: 10 }}>
                {mainHeading}
            </Text>
            <FlatList
                data={NEWSFEED}
                renderItem={flatlist}
            />
        </View>
    )
}
const styles = StyleSheet.create({

    timeViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeStyle: {
        color: '#696969',
        fontWeight: '500',
        fontSize: FONTSIZE.Text16
    },
    commentSection: {
        paddingVertical: 10
    },
    counterText: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 2,
        opacity: 0.8
    },
    downloadView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'space-between',
    },
    container: {
        // flex: 1,
        // backgroundColor: '#000000',
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
        color: "#000",
        fontSize: FONTSIZE.Text20,
        fontWeight: 'bold'
    },
    name: {
        color: "#000",
        fontSize: FONTSIZE.Text20,
        // fontWeight: 'bold'
    },
    commentLineTextStyle: {
        color: "#000",
        fontSize: 16,
        opacity: 0.7,
        marginTop: 0
    },

})