import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, SearchBar, CustomButton, TouchableButton } from '@components'
import { ThreeDots, Girl } from '@assets';
import { Message, Delete } from '@svg'
import { Avatar } from 'react-native-elements'

export default function VendorRequest() {
    return (
        <View style={{ backgroundColor: '#212121', marginVertical: 5, paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <Avatar
                    source={Girl}
                    size='large'
                    rounded
                />
                <Text style={{ color: '#FFFFFF', fontSize: 22, marginLeft: 40 }}>Alexis Sears
                </Text>
            </View>

            <Text style={styles.text1}>Requested to work at your upcoming event, Homecoming Party
            </Text>

            <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-around' }}>
                <TouchableButton
                    icon={<Delete height={30} width={30} />}
                    ButtonTitle={"Delete"}
                    ButtonStyle={styles.buttonStyle}
                    TitleStyle={{marginLeft:5}}
                />
                <TouchableButton
                    icon={<Message height={30} width={30} />}
                    ButtonTitle={"Message"}
                    ButtonStyle={[styles.buttonStyle,{justifyContent:'space-between'}]}
                    TitleStyle={{marginLeft:5}}
                />
            </View>
            <CustomButton
                Pay
                ButtonTitle={"Hire"}
                ContainerStyle={{ paddingVertical: 20 }}
                ButtonStyle={{ borderRadius: 24, backgroundColor: '#1FAEF7', paddingVertical: 18 }}
                TitleStyle={styles.TitleStyle}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'row',
        padding: 20,
        minWidth: '40%',
        justifyContent: 'space-evenly'
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 18,
        letterSpacing: 0.02,
        lineHeight: 28,
        paddingVertical: 10,
        opacity: 0.8
    },
    TitleStyle: {
        fontSize: 24
    },
    container: {
        backgroundColor: '#000000',
        flex: 1
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