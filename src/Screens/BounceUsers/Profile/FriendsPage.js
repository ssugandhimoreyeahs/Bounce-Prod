import React, { useEffect, useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { DollarWhite, Food, Security, Video, Girl } from '@assets';
import { FONTSIZE, getHp, getWp } from '@utils'
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { connect, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { observer } from 'mobx-react';
import MobxStore from '../../../mobx'
import { Scaffold, Header } from '@components'
import { Container, Header as NativeHeader, Content, Tab, Tabs } from 'native-base';
import { Searchbar } from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import { ContactList } from '../../../components';
import { Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ApiClient } from '../../../app/services';
import Spinner from 'react-native-loading-spinner-overlay';

const DATA = [
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
];

export default function FriendsPage(props) {
    const { authStore } = MobxStore;
    const { token, userinfo } = authStore.userProfile;
    const { contactTitle, FriendsList } = props.route.params

    console.log("contactTitle", props.route.params.contactTitle)
    console.log("props friends page", props);

    const [showMore, setShowMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
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
                    setAllUser(i.data)
                    setLoader(false);
                }
            })
            .catch(e => {
                console.log(e);
                setLoader(false);
            });

        setLoader(false);
    }

    return (
        <Scaffold statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"always"}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    backgroundColor: '#FBFBFB',
                }}>
                <Spinner visible={loader} color={'#1FAEF7'} />
                {!loader && (
                    <View>
                        {/* Header Section start */}
                        <View style={{
                            marginVertical: getHp(15),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => {
                                props.navigation.goBack()
                            }}>
                                <Back name="chevron-back" color={'#000'}
                                    style={{ marginRight: 20, marginLeft: 10 }}
                                    size={30} />
                            </TouchableOpacity>
                            <Searchbar
                                placeholder={"Search events"}
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                                inputStyle={{
                                    fontSize: FONTSIZE.Text16,
                                    fontFamily: 'AvenirNext-Regular',
                                    alignSelf: 'center'
                                }}
                                style={styles.searchBarStyle}
                                iconColor={"#999999"}
                                placeholderTextColor={"#909090"}
                            />
                        </View>
                        {/* Header Section end */}


                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={{ overflow: 'visible', flex: 1 }}
                            showsVerticalScrollIndicator={false}
                        >

                            <View style={styles.container}>
                                {
                                    contactTitle == 'Find Friends' ?
                                        <ContactList
                                            heading={'Find Friends'}
                                            dataList={allUser}
                                            {...props}
                                            full={true}
                                        />
                                        :
                                        contactTitle == 'See All Friends' ?
                                            <>
                                                <ContactList
                                                    heading={"People You Might Know"}
                                                    dataList={FriendsList}
                                                    {...props}
                                                    full={false}
                                                />
                                                <ContactList
                                                    heading={"My Friends"}
                                                    dataList={FriendsList}
                                                    {...props}
                                                />
                                            </>
                                            :
                                            contactTitle == 'Mutual Friends + All' ?
                                                <>
                                                    <ContactList
                                                        heading={"Mutual Friends"}
                                                        dataList={DATA}
                                                        {...props}
                                                    />
                                                    <ContactList
                                                        heading={"All"}
                                                        dataList={DATA}
                                                        {...props}
                                                    />
                                                </>
                                                : null
                                }
                            </View>
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </Scaffold>
    )
}
FriendsPage.routeName = '/FriendsPage';
const styles = StyleSheet.create({
    headerFlex: {
        flexDirection: 'row',
        paddingVertical: getHp(10),
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    searchBarStyle: {
        elevation: 0,
        borderRadius: 9,
        backgroundColor: '#F2F5F6',
        height: getHp(50),
        fontSize: FONTSIZE.Text16,
        width: '80%',
        alignSelf: 'center'
    },
    past: {
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 30,
        justifyContent: 'space-evenly'
    },
    private: {
        backgroundColor: '#1FAEF7',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
        flex: 1
    },
    doubleSubcontainer: {
        flexDirection: 'row',
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center'
    },
    doubleButton: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        // elevation: 10,
        backgroundColor: '#fff',
        // flex: 1,
        borderRadius: 10,
    },
    container: {
        backgroundColor: '#FBFBFB',
        flex: 1,
        // overflow: 'visible'
    },
    fullInventoryTitleStyle: {
        marginLeft: 10,
        color: '#1FAEF7',
        fontSize: 18,
        letterSpacing: 0.8,
    },
    reviewsTitleStyle: {
        marginVertical: 30,
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    TextInputStyle: {
        backgroundColor: '#fff',
        // borderRadius: 24,
        paddingLeft: 25,
        fontSize: 18,
        // borderWidth: 1,

        width: '80%',
        borderRadius: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#000000',
        width: '100%'
    },
    bottomButton: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'column',
        paddingVertical: 10,
        maxHeight: '100%',
        minWidth: '45%',
        alignItems: 'center'
    },
    ContainerStyle: {
        width: '100%',
        marginVertical: 4,
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    TitleStyle: {
        fontSize: 16,
        paddingVertical: 0
    },


})