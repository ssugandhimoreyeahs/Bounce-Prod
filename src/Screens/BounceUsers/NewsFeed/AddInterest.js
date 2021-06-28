import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Scaffold, ImageCarousel, Media, Header, Footer, CustomText } from '@components'
import { FONTSIZE, getHp, getWp } from '@utils'
import { observer } from 'mobx-react';
import {
    Spotify,
    AppleMusic,
} from '@svg';


const INTEREST = [
    {
        categoryHeading: 'Entertainment',
        categoryList:
            ['Concerts', 'Broadway', 'Comedy', 'Gaming']

    },
    {
        categoryHeading: 'Sports',
        categoryList:
            ['⛳️ Golf', 'Basketball', 'Soccer', 'Hockey']

    },
    {
        categoryHeading: 'Life',
        categoryList:
            ['Dating', 'Traveling', 'Support', 'Gaming']

    }
]
function AdInterest(props) {
    const [state, setState] = useState(0)

    const SmallButton = ({ item }) => {
        return (
            <TouchableOpacity style={[
                styles.itemView,
                item.index == 2 && { backgroundColor: 'rgba(0, 224, 143, 0.24)' },
            ]}>
                <Text style={[styles.headerTitle, {
                    fontSize: FONTSIZE.Text12,
                    letterSpacing: 0.4,
                    fontFamily: 'AvenirNext-Medium'
                }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <Scaffold statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <Header
                headerStyleProp={{ fontFamily: 'AvenirNext-DemiBold' }}
                back
                headerTitle={"My Interests"}
                onPress={() => {
                    props.navigation.goBack()
                }}
                headerBackColor={{ backgroundColor: '#fff', elevation: 0 }}
            />

            <ScrollView style={styles.container}
                contentContainerStyle={{ flexGrow: 1 }}>

                <Text style={[styles.headerTitle, { marginVertical: getHp(15) }]}>
                    {"Music"}
                </Text>

                {/* First Spotify */}
                <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
                    <View style={styles.flex}>
                        <Spotify height={getHp(30)} width={getHp(30)} />
                        <Text
                            style={[
                                styles.headerTitle,
                                {
                                    fontFamily: 'AvenirNext-Medium', marginLeft: 13
                                },
                            ]}>
                            {'Spotify'}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                color: '#1FAEF7',
                                fontFamily: 'AvenirNext-Medium',
                                marginRight: getWp(10)
                            },
                        ]}>
                        {'Connect'}
                    </Text>
                </TouchableOpacity>

                {/* Second Apple Music */}
                <TouchableOpacity style={[styles.socialButton, styles.shadowStyle, { marginTop: getHp(5), marginBottom: getHp(30) }]}>
                    <View style={styles.flex}>
                        <AppleMusic height={getHp(30)} width={getHp(30)} />
                        <Text
                            style={[
                                styles.headerTitle,
                                { fontFamily: 'AvenirNext-Medium', marginLeft: 13 },
                            ]}>
                            {'Apple Music'}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                color: '#1FAEF7',
                                fontFamily: 'AvenirNext-Medium',
                                marginRight: getWp(10)
                            },
                        ]}>
                        {'Connect'}
                    </Text>
                </TouchableOpacity>
                {/* <Text
              style={[
                styles.headerTitle,
                { color: '#999999', fontFamily:'AvenirNext-Medium', marginBottom: 8 },
              ]}>
              {'Tap to Refresh'}
            </Text> */}

                {INTEREST.map((item) => {
                    return (
                        <View style={{ marginVertical: 10 }}>
                            <Text style={[styles.headerTitle, {}]}>
                                {item.categoryHeading}
                            </Text>
                            <View style={{ flexDirection: 'row', padding: 5, marginTop: 5, flexWrap: 'wrap' }}>
                                {
                                    item.categoryList.map((item) => <SmallButton item={item} />
                                    )
                                }
                            </View>
                        </View>
                    )
                })}
                <TouchableOpacity style={[styles.shadowStyle, styles.SaveButton]}>
                    <Text style={{
                        color: '#000',
                        fontFamily: 'AvenirNext-DemiBold', fontSize: FONTSIZE.Text21
                    }}>
                        {'Save'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </Scaffold>
    )
}
AdInterest.routeName = "/AdInterest";
export default observer(AdInterest)


const styles = StyleSheet.create({
    SaveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getHp(50),
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 17,
        position: 'absolute',
        bottom: 10,
    },
    smallButtonStyle: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 5,
        elevation: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: '#FBFBFB',
        flex: 1
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    firstBlock: {
        marginBottom: getHp(20),
        paddingTop: getHp(10),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    addInterest: {
        elevation: 5,
        backgroundColor: '#fff',
        height: getHp(130),
        width: getHp(150),
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999'
    },
    headerTitle: {
        color: '#000',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-DemiBold',
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
    socialButton: {
        height: getHp(50),
        elevation: 0,
        borderRadius: 13,
        paddingHorizontal: getWp(10),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})