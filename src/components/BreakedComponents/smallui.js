import React, { useState, Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Toggle } from '@components'
import {
    BlueTick,
} from '@svg'
import { FONTSIZE, getHp, getWp } from '@utils';
import { Placeholder } from '@assets'

export const BlueCheck = () => {
    return (
        <TouchableOpacity style={{ height: 38, width: 38, backgroundColor: 'rgba(31, 174, 247, 0.13)', borderRadius: 67, justifyContent: 'center', alignItems: 'center' }}>
            <BlueTick height={14} width={18} />
        </TouchableOpacity>
    )
}

export const ConnectSocialMedia = ({
    icon,
    placeholder,
    value,
    onChangeText,
    containerStyle,
}) => {
    return (
        <TouchableOpacity style={[styles.socialButton, styles.shadowStyle, containerStyle]}>
            <View style={styles.flex}>
                {icon}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'#000'}
                    value={value}
                    onChangeText={onChangeText}
                    style={[
                        styles.headerTitle,
                        { marginLeft: 10, fontFamily: 'AvenirNext-Medium' },
                    ]}
                />
            </View>
            <Text
                style={[
                    styles.headerTitle,
                    { color: '#1FAEF7', fontFamily: 'AvenirNext-Medium', marginRight: getWp(10) },
                ]}>
                {'Connect'}
                {/* <Text
              style={[
                styles.headerTitle,
                { color: '#999999', fontFamily:'AvenirNext-Medium', marginBottom: 8 },
              ]}>
              {'Tap to Refresh'}
            </Text> */}
            </Text>
        </TouchableOpacity>
    )
}

export const InputSocialMedia = ({
    icon,
    placeholder,
    value,
    onChangeText,
    containerStyle,
}) => {
    return (
        <TouchableOpacity style={styles.socialButton2}>
            <View style={styles.flex}>
                {icon}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'#999999'}
                    onChangeText={onChangeText}
                    value={value}
                    style={[styles.headerTitle, styles.Tiktok]}
                />
            </View>
        </TouchableOpacity>
    )
}
export const HostToggleButton = ({
    icon,
    placeholder,
    switchOn,
    onChange,
    containerStyle,
}) => {
    return (
        <View style={[styles.flex, styles.toggleView, containerStyle]}>
            <Text style={[styles.privacyTitle, { fontSize: FONTSIZE.Text16 }]}>
                {placeholder}
            </Text>
            <Toggle
                switchOn={switchOn}
                onChange={onChange}
            />
        </View>
    )
}
export const FriendsListRender = ({ item }) => {

    return (
        <View style={styles.singleImage}>
            <View style={styles.friendsView}>
                <Image source={item?.item?.profileImage == null ?
                    Placeholder
                    : { uri: item?.item?.profileImage?.filePath }}
                    style={styles.friendsImage} />
                <Text style={styles.textImage}>{item?.item?.fullName}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    friendsImage: {
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        width: getWp(80),
        height: getHp(80),
        margin: 0
    },
    singleImage: {

        marginRight: 20
    },
    friendsView: {
        justifyContent: 'space-between',
        height: getHp(104),
        backgroundColor: '#fff',
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
    },
    textImage: {
        paddingTop: 3,
        fontFamily: 'AvenirNext-Medium',
        color: '#000',
        fontSize: FONTSIZE.Text12,
        width: '100%',
        textAlign: 'center'
    },
    privacyTitle: {
        fontFamily: 'AvenirNext-Medium',
        color: '#000',
        fontSize: FONTSIZE.Text18,
    },
    Tiktok: {
        marginLeft: 10,
        fontFamily: 'AvenirNext-Medium',
        color: '#000',
        width: '100%'
    },
    headerTitle: {
        color: '#000',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Regular',
    },
    addInterest: {
        elevation: 2,
        backgroundColor: '#fff',
        height: getHp(130),
        width: getHp(150),
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    socialButton: {
        height: getHp(50),
        elevation: 0,
        borderRadius: 13,
        paddingHorizontal: getWp(10),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    socialButton2: {
        height: getHp(50),
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        borderRadius: 13,
        paddingHorizontal: getWp(10),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    linearGradient: {
        flex: 1,
        borderRadius: 20,
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
    crossButton: {
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        right: -10,
        top: -10
    },
    toggleView: {
        
        height: getHp(60),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: getWp(10),
        borderBottomWidth: 0.5,
        borderColor: '#EEEEEE'
    },
    privacyTitle: {
        fontFamily: 'AvenirNext-Medium',
        color: '#000',
        fontSize: FONTSIZE.Text18,
    },

})