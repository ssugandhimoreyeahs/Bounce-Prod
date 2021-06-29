import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Scaffold, ImageCarousel, Media, CustomSearchbar, Header, CustomText } from '@components'
import { FONTSIZE, getHp, smallHitSlop } from '@utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    ThreeDots,
    DJ,
    DJ1,
    DJ2,
} from '@assets'
import { BlackOutlineShare, Saved } from '@svg'
import { observer } from 'mobx-react';
import Back from 'react-native-vector-icons/AntDesign';
import { getWp } from '../../../app/utils';

const { height, width } = Dimensions.get("screen")


const INTEREST = [
    {
        categoryList:
            ['Concerts', 'Broadway', 'Comedy', 'Gaming', 'Concerts', 'Broadway', 'Comedy', 'Gaming']

    },
]

const NEWSFEED = [{
    eventTitle: "Rich Little - Live in Las Vegas",
    name: 'Laugh Factory',
    time: "Dec 31, 8:00 PM",
    rightIcon: { ThreeDots }
},
{
    eventTitle: "Rich Little - Live in Las Vegas",
    name: 'Laugh Factory',
    time: "Dec 31, 8:00 PM",
    rightIcon: { ThreeDots }
}
]

function CommonInterestNewsFeed(props) {
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
            <View style={{ marginBottom: getHp(40), }}>
                {handleCarousel()}
                <View style={{
                    paddingHorizontal: 10,
                    marginTop: getHp(0)
                }}>
                    <View style={[styles.timeViewStyle, { paddingVertical: getHp(5) }]}>
                        <Text style={styles.eventTitleStyle}>
                            {item.eventTitle}
                        </Text>
                        <View style={styles.downloadView}>
                            <Saved height={24} width={22} />
                            <BlackOutlineShare height={24} width={26} />
                        </View>
                    </View>
                    <Text style={styles.timeStyle}>
                        {item.time}
                    </Text>
                </View>
            </View>
        )
    }

    const SmallButton = ({ item }) => {
        return (
            <TouchableOpacity style={[
                styles.itemView,
                { backgroundColor: 'rgba(0, 224, 143, 0.24)' },
            ]}>
                <Text style={[styles.headerTitle, {
                    fontSize: FONTSIZE.Text12,
                    letterSpacing: 0.4,
                    color: '#000',
                    fontFamily: 'AvenirNext-Medium'
                }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <Scaffold
            statusBarStyle={{ backgroundColor: '#fff' }}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    hitSlop={smallHitSlop}
                >
                    <Back name="left" color={'#000'} size={25} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {"You and David both like:"}
                </Text>
            </View>



            <ScrollView style={{ flex: 1 }}>
                {INTEREST.map((item) => {
                    return (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', }}>
                                {
                                    item.categoryList.map((item) => <SmallButton item={item} />
                                    )
                                }
                            </View>
                        </ScrollView>
                    )
                })}

                {INTEREST.map((item) => {
                    return (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                            <View style={{ flexDirection: 'row', }}>
                                {
                                    item.categoryList.map((item) => <SmallButton item={item} />
                                    )
                                }
                            </View>
                        </ScrollView>
                    )
                })}


                <TouchableOpacity style={[styles.SaveButton]}>
                    <Text style={{
                        color: '#1FAEF7',
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: FONTSIZE.Text16,
                        letterSpacing: 0.6
                    }}>
                        {'Bounce with more friends'}
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={NEWSFEED}
                    renderItem={flatlist}
                />

                <View style={{ marginBottom: 30 }} />

            </ScrollView>
        </Scaffold>
    )
}
CommonInterestNewsFeed.routeName = "/CommonInterestNewsFeed";
export default observer(CommonInterestNewsFeed)


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
    eventTitleStyle: {
        color: "#000",
        fontSize: FONTSIZE.Text18,
        fontFamily: 'AvenirNext-DemiBold'
    },
    downloadView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'space-around',
    },
    SaveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getHp(34),
        margin: getHp(10),
        backgroundColor: '#F2F5F6',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#E4EEF1'

    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        // elevation: 1,
    },
    firstBlock: {
        height: height / 4,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        paddingVertical: 5,
        alignItems: 'center',

    },
    addInterest: {
        elevation: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 24
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    headerTitle: {
        alignSelf: 'center',
        marginLeft: getWp(10),
        color: '#ABB3B6',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Medium',
    },
    itemView: {
        height: 35,
        backgroundColor: '#F2F5F6',
        justifyContent: 'center',
        paddingHorizontal: getHp(15),
        borderRadius: 100,
        marginHorizontal: 5,
        marginVertical: 5,
    },
})