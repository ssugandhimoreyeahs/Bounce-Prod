import React, { useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Header, SearchBar, Footer, TouchableButton, CustomSearchbar, Calender, ModalPopup, Root } from '@components'
import { Girl } from '@assets';
import {
    Info,
    AddBlueWhite,
    ContactWhite,
    List,
    BlackMenubar,
    BlackContact,
    Dollar
} from '@svg'
import { KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'



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

export default function UserFriendsPage(props) {
    const {
        age = false
    } = props
    const scrollRef = useRef();
    return (
        <Root>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Icon name="chevron-back" size={30} color="#000" style={{ marginRight: 10 }} />
                    <CustomSearchbar
                        placeholder={"Search"} />
                </View>

                <ScrollView >
                    <View style={styles.container}>
                        <View style={{ paddingVertical: 10 }}>
                            <SearchBar
                                cb={() => {
                                    scrollRef.current.scrollToEnd({ animated: true })
                                }}
                                heading={'Contacts'}
                                noSearchbar
                                // cohost
                                placeholder={"Search Friends"}
                                dataList={DATA}
                                parentState={() => setVendor(!getVendor)}
                                filterSmallButtons={["All", "On Bounce"]}
                                mutual
                            />
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <SearchBar
                                heading={'Friends'}
                                noSearchbar
                                // cohost
                                placeholder={"Search Friends"}
                                dataList={DATA}
                                parentState={() => setVendor(!getVendor)}
                                mutual
                            />
                        </View>



                    </View>
                    {/* <Footer
                        CompleteButton
                        text={"Select"}
                    /> */}
                </ScrollView>

            </KeyboardAvoidingView >
        </Root >
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(238, 238, 238, 0.5)',
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

        backgroundColor: '#fff',
        flex: 1,
        // overflow: 'visible',
        paddingHorizontal: 10
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