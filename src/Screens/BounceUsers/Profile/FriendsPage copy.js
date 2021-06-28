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
import { Scaffold } from '@components'
import { Container, Header as NativeHeader, Content, Tab, Tabs } from 'native-base';
import { Searchbar } from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import { ContactList } from '../../../components';



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
    const {
        age = false
    } = props
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Scaffold statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.headerFlex}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}>
                    <Back name="chevron-back"
                        color={'#000'}
                        style={{ marginRight: 20, marginLeft: 10 }}
                        size={30}
                    />
                </TouchableOpacity>

                <Searchbar
                    placeholder={"Search"}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    inputStyle={{
                        fontSize: FONTSIZE.Text14,
                        fontFamily: 'AvenirNext-Regular',
                    }}
                    style={styles.searchBarStyle}
                    iconColor={"#999999"}
                    placeholderTextColor={"#909090"}
                />
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ overflow: 'visible', flex: 1 }}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.container}>
                    {/* <ContactList
                        heading={"Mutual Friends"}
                        dataList={DATA}
                        {...props}
                    /> */}
                    <ContactList
                        heading={"Friends"}
                        dataList={DATA}
                        {...props}
                    />
                </View>

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
        // lineHeight: -41,
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