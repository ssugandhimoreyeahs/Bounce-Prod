import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Header, SearchBar, Footer, CustomButton, Toggle, Calender, ModalPopup, Root, PastGuestList, Scaffold } from '@components'
import { Girl } from '@assets';
import {
    Info,
    AddBlueWhite,
    ContactWhite,
    List,
    BlackMenubar,
    BlackContact,
    Dollar,
    CohostWhite
} from '@svg'
import { KeyboardAvoidingView } from 'react-native';
import { FONTSIZE, getHp, getWp } from '@utils'



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

export default function InviteFriends(props) {
    const {
        age = false
    } = props
    return (
        <Scaffold>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ overflow: 'visible', flex: 1 }}>
                    <Header
                        back
                        headerTitle={"Invite Friends"}
                    />

                    <PastGuestList
                        onPressGuessList={() => props.navigation.navigate('GuestContactList', {
                            heading: "Beverly Hills Bachelor Party"
                        })}
                        PAST_LIST_ARRAY={DATA}
                        heading={"Beverly Hills Bachelor Party"}
                    />
                    <PastGuestList
                        onPressGuessList={() => props.navigation.navigate('GuestContactList', {
                            heading: "Beverly Hills Bachelor Party"
                        })}
                        PAST_LIST_ARRAY={DATA}
                        heading={"Beverly Hills Bachelor Party"}
                    />
                    <PastGuestList
                        onPressGuessList={() => props.navigation.navigate('GuestContactList', {
                            heading: "Beverly Hills Bachelor Party"
                        })}
                        PAST_LIST_ARRAY={DATA}
                        heading={"Beverly Hills Bachelor Party"}
                    />

                    <View style={{ marginHorizontal: getWp(10), paddingVertical: getHp(20) }}>
                        <SearchBar
                            placeholder={"Search Friends"}
                            cohost
                            rightIcon
                            requestIcon
                            heading={"Friends"}
                            dataList={DATA}
                            mutual
                            noUnderline
                            filterSmallButtons={["All", "Selected", "Unselected"]}
                        />
                    </View>

                </ScrollView>

            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <CustomButton
                    complete
                    bar
                    ButtonTitle={"Continue"}
                />
            </View>
        </Scaffold>
    )
}
InviteFriends.routeName = '/InviteFriends';
const styles = StyleSheet.create({
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
        backgroundColor: '#F2F2F2',
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