import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, SearchBar } from '@components'
import { Interested, Girl, Arrived, CantGo } from '@assets';

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

export default function Private() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Header
                    back
                    headerTitle={"RSVPs"}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.fourItems}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={CantGo} />
                                <Text style={{ color: '#FFFFFF', fontSize: 18, }}>Going</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={CantGo} />
                                <Text style={{ color: '#FFFFFF', fontSize: 18, }}>Interested</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={CantGo} />
                                <Text style={{ color: '#FFFFFF', fontSize: 18, }}>Can't Go</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={Arrived} />
                                <Text style={{ color: '#FFFFFF', fontSize: 18, }}>Arrived</Text>
                            </View>
                        </View>
                    </View>

                    <SearchBar 
                     placeholder={"Search"}
                     dataList={DATA}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerLeftButtonStyle: {

    },
    footerRightButtonStyle: {

    },
    reviewsTitleStyle: {
        color: '#fff',
        fontSize: 16,

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
    }
})