import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Header, SearchBar, Footer, CustomText, Toggle, Calender, ModalPopup, Root } from '@components'
import { Girl } from '@assets';
import {
    Info,
    GreenTick,
    WhiteTick,
    BlackOutlineHeart,
    DollarOnlyWhite,
    FavouritedHeart,
    BlackPen,
    Dollar
} from '@svg'
import { FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Ratings from "../../components/RatingStar/Ratings";
import { BlackOutlineShare } from '../../assets/Svg';
import { Container, Header as NativeHeader, Content, Tab, Tabs } from 'native-base';
import { styles } from './indexCss'
import Tab1 from '../../Screens/BounceUsers/UserFriendsProfile/Tab1.js';
import Tab2 from '../../Screens/BounceUsers/UserFriendsProfile/Tab2.js';
import Tab3 from '../../Screens/BounceUsers/UserFriendsProfile/Tab3.js';
import { FONTSIZE, getHp, getWp } from '@utils'
import MboxStore from '../../mobx';
import { observer } from 'mobx-react';
import EventPageTab1 from '../../Screens/MyEvents/EventTab1'
import EventPageTab2 from '../../Screens/MyEvents/EventTab2'


export const ThreeFooterButtons = ({ icon, ButtonTitle }) => {
    return (
        <TouchableOpacity style={styles.bottomContainer}>
            {icon}
            <Text style={[{ color: '#000', fontSize: FONTSIZE.Text12, fontFamily: '500',marginTop:5 }]}>
                {ButtonTitle}
            </Text>
        </TouchableOpacity>
    )
}

export const PrivacyBlock = () => {
    return (<View>
        <Text style={styles.headerTitle}>{"Privacy Settings"}</Text>
        <Text style={styles.headerTitle}>{"Choose what you want to share with friends. Only public events can be displayed on your profile."}</Text>
    </View>
    )
}

export const EventTabview = observer((props) => {
    return (
        <View style={{ borderBottomWidth: 1, borderColor: '#EEEEEE', }}>
            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#000000' }}>

                <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
                    textStyle={{ color: '#999999', fontFamily: '500',fontSize:FONTSIZE.Text16 }}
                    activeTabStyle={{ backgroundColor: '#FBFBFB' }}
                    activeTextStyle={{ color: '#000', fontFamily: 'ANB',fontSize:FONTSIZE.Text16 }} heading={"Attending"}>
                    <ScrollView nestedScrollEnabled={true} style={{
                        height: 300
                    }}>
                        <EventPageTab1 partyStore={MboxStore.partyStore} {...props} />
                    </ScrollView>
                </Tab >

                <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
                    textStyle={{color: '#999999', fontFamily: '500',fontSize:FONTSIZE.Text16 }}
                    activeTabStyle={{ backgroundColor: '#FBFBFB' }}
                    activeTextStyle={{ color: '#000', fontFamily: 'ANB',fontSize:FONTSIZE.Text16 }} heading="Featuring">
                    <EventPageTab2 />
                </Tab>
            </Tabs>
        </View>
    );
});
export const Tabview = observer((props) => {
    return (
        <View style={{ marginVertical: 10, borderBottomWidth: 1, borderColor: '#EEEEEE' }}>
            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#000000' }}>

                <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
                    textStyle={{ color: '#000', fontFamily: '500' }}
                    activeTabStyle={{ backgroundColor: '#FBFBFB' }}
                    activeTextStyle={{ color: '#000', fontFamily: '500' }} heading={"Hosting"}>
                    <ScrollView nestedScrollEnabled={true} style={{
                        height: 300
                    }}>
                        <Tab1 partyStore={MboxStore.partyStore} {...props} />
                    </ScrollView>
                </Tab >

                <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
                    textStyle={{ color: '#000', fontFamily: '500' }}
                    activeTabStyle={{ backgroundColor: '#FBFBFB' }}
                    activeTextStyle={{ color: '#000', fontFamily: '500' }} heading="Attending">
                    <Tab2 />
                </Tab>

                <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
                    textStyle={{ color: '#000', fontFamily: '500' }}
                    activeTabStyle={{ backgroundColor: '#FBFBFB' }}
                    activeTextStyle={{ color: '#000', fontFamily: '500' }} heading="Interested">
                    <Tab3 />
                </Tab>

            </Tabs>
        </View>
    );
});




export const VendorCard = ({ item }) => {
    let { icon, name, city, rating, price, desc, liked = false } = item?.item

    return (<View style={{
        // flex:1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginVertical: 5
    }}>
        <View style={{
            // flex:1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",

            }}>
                <Avatar
                    source={icon}
                    size={getHp(60)}
                    rounded
                />
                <View style={{ paddingLeft: 15 }}>
                    <Text style={[styles.fullName, { marginBottom: 4 }]}>
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.fullName,
                            {
                                color: "#696969",
                                fontSize: FONTSIZE.Text14,
                                marginTop: 0,
                            }
                        ]}>
                        {city}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.fourItems, { backgroundColor: 'rgba(31, 174, 247, 0.7)', borderRadius: 50, padding: 10 }]}>
                <WhiteTick height={21} width={21} />
            </TouchableOpacity>

        </View>


        <CustomText
            TextData={desc}
            styleProp={{ color: "#000", fontSize: FONTSIZE.Text18, marginVertical: getHp(15) }}
        />

        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            {/ Rating and Hourly Rate /}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                <Ratings rating={rating} />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 15,
                    }}>
                    <View style={{
                        backgroundColor: "#00E08F",
                        borderRadius: 5,
                        padding: 2,
                    }}>
                        <DollarOnlyWhite height={18} width={18} />
                    </View>
                    <Text style={styles.hourStyle}>
                        {price} {"/ hour"}
                    </Text>
                </View>
            </View>
            {/ Heart Share /}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
            }}>
                {
                    liked ?
                        <BlackOutlineHeart height={22} width={24} />
                        : <FavouritedHeart height={22} width={24} />
                }
                <BlackOutlineShare height={25} width={27} style={{ marginLeft: 30 }} />
            </View>

        </View>
    </View>
    )
}

export const ChooseVendorCard = ({ item }) => {
    // console.log("ITEMS IN CHOOSE FUNCTIONS -->", item)
    return (
        <View style={{ alignItems: 'center', backgroundColor: '#F2F5F6', borderRadius: 24, paddingHorizontal: 10, paddingVertical: 20, marginLeft: 10, marginRight: 1 }}>
            <Avatar
                source={item.icon}
                rounded
                size={getHp(60)}
            />
            <Text style={[styles.allTitleStyle, { marginVertical: 5 }]}>
                {item.messageName}
            </Text>
            <View style={{ marginTop: 5 }}>
                <Ratings rating={item.rating} />
            </View>
        </View>
    )
}

export const InputBox = ({ placeholder, onChangeText, styleProp }) => {
    return (
        <TextInput
            placeholderTextColor={"#999999"}
            placeholder={placeholder}
            style={[styles.textInput, styleProp]}
            onChangeText={onChangeText}

        />
    )
}

export const PastGuestList = ({ PAST_LIST_ARRAY, heading, pen = false, onPressGuessList = () => { } }) => {

    const RenderItem = ({ item }) => {
        return (
            <View style={{}}>
                {item.index < 4 ?
                    <View style={item.index ? styles.congested : [styles.congested, { marginLeft: 0 }]}>
                        <Avatar
                            source={item.item.icon}
                            rounded
                            size={getHp(30)}

                        />
                        {item.index == 3 ?
                            <Text style={[styles.TitleStyle, { color: '#000', marginLeft: 15, fontSize: FONTSIZE.Text16 }]}>{`${PAST_LIST_ARRAY.length - 4} guests`}</Text>
                            : null}
                    </View> : null}

            </View>
        )
    }

    const bridge = (item) => {
        console.log("fdfdfsd", item)
        return (
            <TouchableOpacity onPress={onPressGuessList}>
                <RenderItem item={item} />
            </TouchableOpacity>

        )
    }

    return (
        <TouchableOpacity onPress={onPressGuessList} style={styles.pastGuestContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.TitleStyle, { color: '#000', fontWeight: 'bold', paddingVertical: 5 }]}>{heading}</Text>
                {
                    !pen && <BlackPen height={28} width={25} />
                }
            </View>
            <View style={{ paddingVertical: 5 }}>
                <FlatList
                    data={PAST_LIST_ARRAY}
                    renderItem={(item) => <RenderItem item={item} />}
                    horizontal
                />
            </View>

        </TouchableOpacity>
    )
}

export const SwitchButton = (props) => { 
    const {
        value,
        onPrivatePress,
        onPublicPress
    } = props;
    const {
    } = props
    const onValues = {
        backgroundColor: '#fff',
        height: getHp(46),
        elevation: 10
    }
    const offValues = {
        backgroundColor: '#EEEEEE',
        height: getHp(38)
    }
    return (
        <View style={styles.doubleButton}>
            <View style={styles.doubleSubcontainer}>
                <TouchableOpacity
                    style={[styles.private,
                        value ? onValues : offValues]} onPress={() => onPrivatePress()}>
                    <Text style={[styles.TitleStyle, value ? { color: '#1FAEF7', fontWeight: 'bold' } : { color: '#000', fontWeight: 'normal' }]}>{"Private"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.private, value ? offValues : onValues]} onPress={() => onPublicPress()}>
                    <Text style={[styles.TitleStyle, !value ? { color: '#1FAEF7', fontWeight: 'bold' } : { color: '#000', fontWeight: 'normal' }]}>{"Public"}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute', right: -45 }}>
                <Info height={25} width={25} />
            </View>
        </View>
    )
}

export const DollarField = (props) => {
    // console.log("props breaked", props);
    return (
        <View style={styles.DollarView}>
            <View style={{ paddingHorizontal: 20, }}>
                <Dollar height={20} width={20} style={{ margin: 0 }} />
            </View>
            <View style={{ height: getHp(40), borderWidth: 0.5, borderColor: '#999999' }} />
            <TextInput
                placeholder={"Entry Fee"}
                style={styles.TextInputStyle}
                placeholderTextColor={"#909090"}
            />
        </View>
    )
}

export const AgeField = (props) => {
    // console.log("props breaked", props);
    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: getHp(15), justifyContent: 'space-between', borderRadius: 17 }}>
            <TextInput
                placeholder={"Min Age"}
                style={[styles.TextInputStyle, { elevation: 5, backgroundColor: '#fff', width: '48%' }]}
                placeholderTextColor={"#909090"}
            />
            <TextInput
                placeholder={"Max Age"}
                style={[styles.TextInputStyle, { elevation: 5, backgroundColor: '#fff', width: '48%' }]}
                placeholderTextColor={"#909090"}
            />
        </View>

    )
}

export const RenderSmallButton = ({ item }) => {

    return (
        // <LinearGradient colors={['#1FAEF7', '#AEE4FF']} style={[styles.linearGradient, { marginTop: getHp(15), flexDirection: 'row', alignItems: 'center', }]}>

        <TouchableOpacity style={[styles.allButtonStyle, { backgroundColor: '#F2F5F6', alignSelf: 'flex-start', marginRight: 5 }]}>
            <Text style={[styles.allTitleStyle, { fontFamily: '500' }]}>
                {item}
            </Text>
        </TouchableOpacity>

        // </LinearGradient>

    )
}