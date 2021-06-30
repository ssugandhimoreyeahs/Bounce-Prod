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
import { Placeholder } from '@assets'
import Spinner from 'react-native-loading-spinner-overlay';
import { ApiClient } from '../../app/services';
import MobxStore from '../../mobx';

export default function ContactList(props) {
    const { authStore } = MobxStore;
    const { token, userinfo } = authStore.userProfile;
    const {
        heading = '',
        mutual = true,
        requestIcon = false,
        dataList = [],
        full = true
    } = props
    const [showMore, setShowMore] = useState(false);
    const [loader, setLoader] = useState(false);
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        bringAllUser()
    }, [])

    console.log("token", token);

    const bringAllUser = async () => {
        setLoader(true);

        await ApiClient.authInstance
            .get(ApiClient.endPoints.getAllUser, {
                params: {
                    'Authorization': `bearer ` + `${token}`
                }
            })
            .then(async i => {
                MobxStore.authStore.async.reloadUser();
                console.log("Data of all user:", i.data);
                if (i.status == 201 || i.status == 200) {
                    setAllUser(i)
                    setLoader(false);
                }
            })
            .catch(e => {
                console.log(e);
                setLoader(false);
            });

        setLoader(false);
    }
    const RenderItem = ({ item }) => {
        console.log("friends list ", item.index)
        console.log("item friends list ", item.item.email)
        const { city, age, fullName } = item?.item


        return (
            <View style={{ paddingHorizontal: 10 }} key={item.index}>
                <View style={styles.RenderItemViewStyle}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate(GuestProfile.routeName, { "UserData": dataList[item.index] })}
                        // onPress={() =>console.log("Clicked Index",item.index)}
                        style={styles.contactRow}>
                        <View style={{
                            flex: 1, flexDirection: 'row', alignItems: 'center',
                        }}>

                            <View style={{ width: '10%' }}>
                                <Avatar
                                    // source={{ uri: item?.item?.profileImage?.filePath }}
                                    source={item?.item?.profileImage == null ?
                                        Placeholder
                                        : { uri: item?.item?.profileImage?.filePath }}
                                    size={getHp(42)}
                                    rounded
                                />
                            </View>


                            <View style={{ marginLeft: 15, width: '80%' }}>
                                <Text style={styles.NameStyle}>
                                    {fullName}
                                </Text>
                                {
                                    mutual &&
                                    <Text style={styles.mutualGreyText}>{city}</Text>
                                }
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={} 
                        style={{ width: '7%' }}>
                        {!(heading == 'Find Friends' ||
                            heading == 'People You Might Know' ||
                            heading == 'All')
                            ?
                            <BlueTick height={12} width={16} style={{ marginRight: getWp(0) }} />
                            :
                            <SendRequest height={27} width={25} style={{ marginRight: getWp(0) }} />

                        }
                    </TouchableOpacity>
                    {/* </TouchableOpacity> */}
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

    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#fff' }}>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader && (

            <View style={{ marginVertical: getHp(10) }}>
                <Text style={styles.reviewsTitleStyle}>
                    {heading}
                </Text>

                {full ?
                    <FlatList
                        data={dataList}
                        renderItem={(item) => <RenderItem item={item} />}
                        keyExtractor={index => index}
                    />
                    :
                    <>
                        <FlatList
                            data={!showMore ? dataList.slice(0, 3) : dataList}
                            renderItem={(item) => <RenderItem item={item} />}
                            keyExtractor={index => index}
                        />
                        {dataList.length > 3 && (
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
                    </>
                }
            </View>
        )}
    </Scaffold>
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
