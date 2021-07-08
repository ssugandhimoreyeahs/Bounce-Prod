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
import { BlackOutlineShare, Saved, BounceText } from '@svg'
import { observer } from 'mobx-react';
import { getWp } from '../../../app/utils';
import AddInterest from './AddInterest';
import { ApiClient } from '../../../app/services';
import Spinner from 'react-native-loading-spinner-overlay';
// import { styles } from '../../BounceVendors/VendorProfile/indexCss';
import MobxStore from '../../../mobx'

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

function NewsFeed(props) {
    const [state, setState] = useState(0)
    const [newsFeedData, setNewsFeedData] = useState(0)
    const imageArray = [DJ, DJ1, DJ2]
    const [loader, setLoader] = useState(false);
    const {
        authStore
    } = MobxStore;
    const { navigation } = props;
    const userinfo = authStore.userProfile;



    const initialRender = async () => {
        setLoader(true);
        await ApiClient.authInstance
            .get(ApiClient.endPoints.tagWiseNewsFeed)
            .then(async i => {
                console.log("@@@@RESPONSE of Tag wise News Feed- ", JSON.stringify(i.data));

                if (i.status == 201 || i.status == 200) {
                    setNewsFeedData(i.data)
                    setLoader(false);
                    MobxStore.authStore.async.reloadUser()
                }
            })
            .catch(e => {
                console.log(e.response);
                setLoader(false);
            });
        setLoader(false);
    }

    useEffect(() => {
        initialRender()
    }, [])

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
        const {
            description,
            date
        } = item
        console.log(' description date', description, date)
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
                        {date}
                    </Text>
                </View>
            </View>
        )
    }


    return (
        <Scaffold
            statusBarStyle={{ backgroundColor: '#fff' }}>
            <Spinner visible={loader} color={'#1FAEF7'} />
            {!loader && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            hitSlop={smallHitSlop}
                        >
                            <BounceText height={24} width={107} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(AddInterest.routeName)}
                            style={[
                                styles.itemView,
                                { backgroundColor: 'rgba(0, 224, 143, 0.12)', borderRadius: 7 },
                            ]}>
                            <Text style={[styles.headerTitle, {
                                fontSize: FONTSIZE.Text15,
                                letterSpacing: 0.4,
                                color: '#00E08F',
                                fontFamily: 'AvenirNext-DemiBold'
                            }]}>
                                {'My Interest'}
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={newsFeedData}
                            renderItem={flatlist}
                        />
                        <View style={{ marginBottom: 30 }} />
                    </ScrollView>
                </View>
            )
            }
        </Scaffold>
    )
}
NewsFeed.routeName = "/NewsFeed";
export default observer(NewsFeed)


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
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
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