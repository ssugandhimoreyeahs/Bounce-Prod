import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Back from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-vector-icons/Entypo';
import { shareFunction } from '@components'
import { FONTSIZE, getHp, getWp } from '@utils'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Girl } from '@assets'
import { FlatList } from 'react-native';
import { UserContext } from "../../context/profiledataProvider";
import MobxStore from '../../mobx';
import { observer } from 'mobx-react';

const { height, width } = Dimensions.get('screen')

function Header(props) {
    const {
        headerStyleProp,
        ACCOUNTS = {},
        dropdown = false,
        headerTitle,
        onPress,
        back = false,
        share = false,
        headerBackColor = null,
        rightTitle = false,
        onPressRightTitle = () => { },
        rightTitleStyle = null,
        rightTitleContainer = null,
        leftTitleContainer = null,
        leftDropdown = null,
        scanner = false,
        onPressScanner = () => { },
        DropdownAccounts = [],
        theme = false,
    } = props;

    const {
        authStore
    } = MobxStore;
    const {
        userProfile } = authStore;
    const userinfo = userProfile;
    const [animated, setAnimated] = useState({ ballAnimation: new Animated.Value(1) })
    const [state, setState] = useState(false)
    const [showDropdown, setShow] = useState(false)


    const animateBall = () => {
        setState(!state)
        Animated.timing(animated.ballAnimation, {
            toValue: 85,
            duration: 1500,
        }).start()
    }
    const ballAnimation = {
        transform: [
            {
                translateY: animated.ballAnimation,
            }]
    }


    return (
        <View>
            <View style={[styles.container, headerBackColor ? headerBackColor : null]}>

                {
                    back ?
                        <TouchableOpacity onPress={onPress}>
                            <Back name="chevron-back" color={theme ? theme : '#000'} size={30} />
                        </TouchableOpacity>
                        : null
                }
                {
                    leftDropdown ?
                        <TouchableOpacity onPress={() => setShow(!showDropdown)} >
                            <View style={styles.headerDropdown}>
                                <Icon name="angle-right" size={getHp(30)} color="#000" style={{ marginHorizontal: 5 }} />
                                <Text style={[styles.leftTitleStyle, rightTitleStyle, { marginLeft: getWp(5) }]}>
                                    {`${leftDropdown}`}
                                </Text>

                            </View>
                        </TouchableOpacity>
                        : null
                }

                {
                    dropdown ?
                        <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }]}
                        // onPress={animateBall} 
                        >
                            <Text style={[styles.leftTitleStyle, { marginRight: 5 }, rightTitleStyle]}>
                                {`${dropdown}`}
                            </Text>
                            <Icon name="angle-down" size={25} color={"#000"} style={{ marginTop: 2 }} />

                        </TouchableOpacity>
                        : null
                }
                <Text style={[styles.headerTitleStyle, headerStyleProp, {fontFamily: 'AvenirNext-DemiBold'} ]}>
                    {headerTitle}
                </Text>
                <View >
                    {
                        share ?

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {
                                    scanner ?
                                        <TouchableOpacity onPress={onPressScanner} style={{ marginRight: getWp(30) }}>
                                            {scanner}
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                                <TouchableOpacity onPress={onPress} style={{}}>
                                    {share}
                                </TouchableOpacity>

                            </View>
                            :
                            null
                    }
                </View>
                {
                    rightTitle ?
                        <TouchableOpacity onPress={onPressRightTitle}>
                            <View style={rightTitleContainer}>
                                <Text style={[styles.rightTitleStyle, rightTitleStyle]}>
                                    {rightTitle}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        : null
                }
                {state ?
                    <Animated.View
                        style={[ballAnimation, { position: 'absolute', bottom: 0, width: width, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, backgroundColor: '#F4F4F4' }]}>
                        {
                            ACCOUNTS.map((item) => {
                                return (
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }} >
                                        <Avatar
                                            source={item.icon}
                                            size='small'
                                            rounded
                                        />
                                        <Text style={{ color: '#000', fontSize: FONTSIZE.Text20, marginLeft: 20, }}>{item.messageName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity style={{ padding: 5, backgroundColor: '#fff', alignItems: 'center', borderRadius: 18, margin: 10 }} >

                            <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, marginLeft: 20, }}>{"Add Account"}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    : null
                }
            </View>

            {showDropdown && <View style={styles.dropdownContainer}>
                {showDropdown &&
                    (
                        <>
                            <TouchableOpacity style={[styles.headerDropdown, { paddingVertical: 10, }]}>
                                <Avatar source={{ uri: userinfo?.user?.profileImage?.filePath }} size={getHp(50)} rounded />
                                <Text style={[{ marginLeft: getWp(20), color: '#000', fontSize: FONTSIZE.Text18, fontFamily:'AvenirNext-Medium' }]}>
                                    {userinfo?.user?.fullName}
                                </Text>
                            </TouchableOpacity>
                            {/* {
                                DropdownAccounts.length - 1 > index ?
                                    <View style={styles.partition} /> : null
                            } */}
                        </>
                    )
                }
                <TouchableOpacity style={{ elevation: 5, backgroundColor: '#F2F5F6', borderRadius: 18, paddingVertical: 10, alignItems: 'center', marginVertical: 8 }}>
                    <Text style={{ color: '#000000', fontSize: FONTSIZE.Text16, fontFamily: 'AvenirNext-Bold' }}>
                        {"New Account"}
                    </Text>
                </TouchableOpacity>
            </View>}

        </View>
    )
}
const styles = StyleSheet.create({
    dropdownContainer: {
        backgroundColor: 'red',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderWidth: 0.5,
        borderColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    partition: {
        height: getHp(0.5),
        backgroundColor: '#CCCCCC',

    },
    headerDropdown: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backIconStyle: {
        // color: "#000",

    },
    headerTitleStyle: {
        fontFamily: 'AvenirNext-UltraLight',
        color: "#000",
        fontSize: FONTSIZE.Text22,
        letterSpacing: 0.1,
        fontWeight: 'bold'
    },
    rightTitleStyle: {
        color: "#1FAEF7",
        fontSize: FONTSIZE.Text20,
    },
    leftTitleStyle: {
        color: "#000",
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#F4F4F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        // borderBottomWidth: 0.5,
        borderColor: '#696969',
        // overflow: 'visible',
        // position:'absolute'
        // zIndex: 1
    }
})

export default observer(Header);