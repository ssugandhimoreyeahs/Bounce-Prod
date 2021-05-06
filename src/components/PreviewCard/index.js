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
import { getHp, FONTSIZE, getWp } from '@utils'
export default function PreviewCard(props) {
    const {
        title,
        stars,
        rates,
        imageBottomLeftText,
        imageBottomRightRate,
    } = props
    const imageArray = [DJ, DJ1, DJ2]
    const [state, setState] = useState(0)
    const handleCarousel = () => {
        console.log("2 VALUES ", imageBottomLeftText, imageBottomRightRate)
        return <ImageCarousel
        pagination
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
            imageBottomLeftText={imageBottomLeftText}
            imageBottomRightRate={imageBottomRightRate}
        />
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', marginBottom: 0, borderRadius: 15, elevation: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
                    <Text style={[styles.reviewsTitleStyle, { fontWeight: 'bold' }]}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#DDDDDD',borderRadius:8,padding:5 }}>
                        <Image source={YellowStar} />
                        <Text style={{ color: '#000', fontSize: 20, marginLeft: 5 }}>{stars}</Text>
                    </View>
                </View>

                {handleCarousel()}
                {/* <View> */}

                <View style={[styles.flexDirectionStyle, { marginTop:-25,borderRadius:15 }]}>
                    <View style={[styles.flexDirectionStyle, { width: '40%', justifyContent: 'space-around' }]}>
                        <Image source={RedHeart} />
                        <Image source={ShareWhite} />
                    </View>
                    {!rates ? <View style={[styles.flexDirectionStyle, { width: '25%', justifyContent: 'space-around' }]}>
                        <Image source={DollarWhite} />
                        <Text style={[styles.reviewsTitleStyle, { fontSize: 20 }]}>{rates}</Text>
                    </View>
                        :
                        <Text style={[styles.fullInventoryTitleStyle]}>{"Full Inventory"}</Text>
                    }
                </View>
                {/* </View> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    fullInventoryTitleStyle: {
        color: '#1FAEF7',
        fontSize: 18,
        marginRight: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: getHp(10)
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        color: '#000',
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