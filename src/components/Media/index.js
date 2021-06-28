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
            noAddButton={false}
            value={'Normal'}
            pagination={true}
        />
    }


    const flatlist = ({ item }) => {
        return (
            <View style={{ marginVertical: 0, }}>
                {handleCarousel()}
                <View style={{
                    paddingHorizontal: 0,
                    marginTop: getHp(0)
                }}>
                    <View style={[styles.timeViewStyle, { paddingVertical: getHp(5) }]}>
                        <Text style={styles.eventTitleStyle}>
                            {item.eventTitle}
                        </Text>
                        <View style={styles.downloadView}>
                            <Saved height={29} width={29} />
                            <BlackOutlineShare height={29} width={29} />
                        </View>
                    </View>
                    <Text style={styles.timeStyle}>
                        {item.time}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        // <View style={styles.container}>
            <FlatList
                data={NEWSFEED}
                renderItem={flatlist}
            />
        // </View>
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
        fontFamily: 'AvenirNext-Medium',
        fontSize: FONTSIZE.Text16
    },
    downloadView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'space-between',
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
        fontSize: FONTSIZE.Text18,
        fontFamily: 'AvenirNext-DemiBold'
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