import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, ImageCarousel } from '@components'
import {
    YellowStar, Girl,
    DJ,
    DJ1,
    DJ2,
    DollarWhite,
    RedHeart,
    ShareWhite,

} from '@assets';

export default function Signup() {
    const imageArray = [DJ, DJ1, DJ2]
    const [state, setState] = useState(0)
    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
        />
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#212121', marginTop: 25 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
                    <Text style={styles.reviewsTitleStyle}>DJ DZ</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={YellowStar} />
                        <Text style={{ color: '#FFFFFF', fontSize: 20, marginLeft: 5 }}>4.9</Text>
                    </View>
                </View>
                {handleCarousel()}
                {/* <View> */}
                <View style={[styles.flexDirectionStyle, { marginTop: -25 }]}>
                    <View style={[styles.flexDirectionStyle, { width: '40%', justifyContent: 'space-around' }]}>
                        <Image source={RedHeart} />
                        <Image source={ShareWhite} />
                    </View>
                    <View style={[styles.flexDirectionStyle, { width: '25%', justifyContent: 'space-around' }]}>
                        <Image source={DollarWhite} />
                        <Text style={[styles.reviewsTitleStyle, { fontSize: 20 }]}>800</Text>
                    </View>
                </View>
                {/* </View> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 0
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#212121',
        padding: 10
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        color: '#fff',
        fontSize: 20,
    },
    footerList: {
        height: 70,
        width: 100,
        backgroundColor: '#1D1D1D',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    selectedFooterItem: {
        backgroundColor: "rgba(255, 46, 0, 0.24)",
    }
})