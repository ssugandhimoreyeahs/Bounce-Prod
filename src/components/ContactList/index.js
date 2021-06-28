import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { Avatar } from 'react-native-elements'
import { CustomButton, Scaffold } from '@components'
import {
    RequestSent,
    SendRequest,
    CohostPurple,
    GreenTick,
    BlackArrowDown,
    CohostWhite,
    BlueTick,
} from '@svg'
import { FONTSIZE, getHp, getWp } from '@utils'
import LinearGradient from 'react-native-linear-gradient';
import GuestProfile from '../../Screens/BounceUsers/Profile/GuestProfile';
import { Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ContactList(props) {
    const {
        heading = '',
        mutual = true,
        requestIcon = false,
        dataList = [],
    } = props
    const [showMore, setShowMore] = useState(false);


    const RenderItem = ({ item }) => {
        console.log("item", item)
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.RenderItemViewStyle}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate(GuestProfile.routeName)}
                        style={styles.contactRow}>
                        <View style={{
                            flex: 1, flexDirection: 'row', alignItems: 'center',
                        }}>

                            <View style={{ width: '10%' }}>
                                <Avatar
                                    source={item.item.icon}
                                    size={getHp(42)}
                                    rounded
                                />
                            </View>


                            <View style={{ marginLeft: 15, width: '80%' }}>
                                <Text style={styles.NameStyle}>
                                    {"Porter Robinson"}
                                </Text>
                                {
                                    mutual ?
                                        <Text style={styles.mutualGreyText}>{"20, Los Angeles"}</Text>
                                        : null
                                }
                            </View>

                        </View>

                        <View style={{ width: '7%' }}>
                            {heading == 'Friends' ?
                                <BlueTick height={12} width={16} style={{ marginRight: getWp(0) }} />
                                :
                                <SendRequest height={27} width={25} style={{ marginRight: getWp(0) }} />

                            }
                        </View>
                    </TouchableOpacity>
                </View>

                {/* {console.log('item.index', item.index)} */}
                {!(dataList.length - 1 == item.index) &&
                    <View style={{
                        height: 0.5,
                        backgroundColor: '#DDDDDD'
                    }} />
                }


            </View>
        )
    }

    return (<View style={{ marginVertical: getHp(10) }}>
        <Text style={styles.reviewsTitleStyle}>
            {heading}
        </Text>

        <FlatList
            data={!showMore ? dataList.slice(0, 2) : dataList}
            renderItem={(item) => <RenderItem item={item} />}
            keyExtractor={index => index}
        />
        {dataList.length > 2 && (
            <View style={{ backgroundColor: '#FBFBFB', paddingBottom: 10 }}>
                <Button
                    onPress={() => {
                        setShowMore(i => !i);
                    }}
                    full
                    light
                    style={[styles.showMoreButtonContainer]}>
                    <Text style={[styles.showMoreTextStyle, { fontFamily: 'AvenirNext-Medium', letterSpacing: 0.2 }]}>
                        {!showMore ? `${dataList.length - 2} More` : `Hide`}
                    </Text>
                    <View style={{ marginStart: getHp(10) }}>
                        <AntDesign
                            color={'black'}
                            size={getHp(16)}
                            name={!showMore ? 'down' : 'up'}
                        />
                    </View>
                </Button>
            </View>
        )}
    </View>
    )
}
const styles = StyleSheet.create({
    showMoreButtonContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: getHp(16),
        backgroundColor: '#F2F5F6',
        borderWidth: 1,
        borderColor: '#E4EEF1',
        borderRadius: getHp(10),
        borderBottomLeftRadius: getHp(10),
        borderBottomRightRadius: getHp(10),
    },
    showMoreTextStyle: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: FONTSIZE.Text16,
        lineHeight: getHp(22),
    },
    NameStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text18,
        fontFamily: 'AvenirNext-Medium'
    },
    mutualGreyText: {
        color: '#696969',
        fontSize: FONTSIZE.Text13,
        fontFamily: 'AvenirNext-Medium'
    },
    RenderItemViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    contactRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linearGradient: {
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        marginTop: getHp(20),
        marginBottom: getHp(10),
        paddingHorizontal: getWp(10),
        color: '#000',
        fontSize: FONTSIZE.Text18,
        fontFamily: 'AvenirNext-DemiBold'
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
    },
    allContainerStyle: {
        // alignSelf: 'center',
        width: '100%',
        paddingRight: 5
    },
    allButtonStyle: {
        // width: '10%',
        // borderRadius: 24,
        // backgroundColor: '#1FAEF7',
        // paddingHorizontal: 20,
        // paddingVertical: 5
    },
    allTitleStyle: {
        fontSize: FONTSIZE.Text14,
        fontFamily: 'AvenirNext-DemiBold',
        color: '#fff',
        letterSpacing: 0.5
    },
})
