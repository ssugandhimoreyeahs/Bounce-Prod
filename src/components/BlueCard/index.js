import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import {
    StarPerson,
    Peoples,
    Message,
    Download,
    Party,
    WhiteRightArrow
} from '@assets'
import { MessageBlack, BlueArrowDown } from '@svg'
import { Avatar } from 'react-native-elements'

export default function BlueCard(props) {
    const {
        MESSAGESTACK
    } = props
    const renderItem = ({ item }) => {
        // console.log(item);
        const { name, partyType, time, icon } = item
        return (
            <View style={styles.blueNotificationCard}>
                <View style={styles.flexDirectionStyle}>
                    <View style={styles.flexDirectionStyle}>
                        <Avatar source={icon} size="medium" rounded />
                        <Text style={[styles.textStyle, { marginLeft: 15 }]}>{name}</Text>
                    </View>
                    <View style={styles.RequestButton}>
                        {/* <Image source={icon} size="medium" rounded /> */}
                        <Text style={[styles.textStyle, { color: '#fff' }]}>Request</Text>
                    </View>
                </View>
                <View >
                    <Text style={[styles.textStyle, { paddingTop: 10 }]}>{partyType}</Text>
                    <Text style={[styles.textStyle, { fontSize: 16, fontWeight: 'normal', paddingTop: 10 }]}>{time}</Text>
                </View>

                <View style={styles.textinputStyle}>
                    <MessageBlack height={30} width={30} />
                    <TextInput
                        placeholder={"Message"}
                        style={styles.TextInputStyle}
                        placeholderTextColor={"#909090"}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                initialNumToRender={2}
                data={MESSAGESTACK}
                renderItem={renderItem}
                keyExtractor={(index) => index}
                onEndReachedThreshold={0.5}
            />
            <View style={{ alignItems: 'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                <View style={styles.moreButton}>
                    <Text style={[styles.textStyle, { color: '#1FAEF7', marginRight: 10 }]}>7 More</Text>
                    <BlueArrowDown height={20} width={20} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    moreButton: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: '50%',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    textinputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        borderWidth: 0.5,
        paddingLeft: 10,
        marginTop: 25
    },

    blueNotificationCard: {
        // backgroundColor: 'radial - gradient(76.22 % 76.22 % at 50 % 23.78 %, rgba(31, 174, 247, 0.69) 0 %, rgba(31, 174, 247, 0.5) 100 %, rgba(31, 174, 247, 0.42) 100 %)',
        backgroundColor: '#fff',
        // borderWidth: '0.2px solid #000000',
        // borderRadius: 15,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 20,
        marginVertical: 10
    },
    RequestButton: {
        backgroundColor: '#1FAEF7',
        borderRadius: 15,
        padding: 5
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        color: "#000",
        fontSize: 18,
        fontWeight: 'bold',

    },

    container: {
        backgroundColor: '#000000'
    },
    TextInputStyle: {
        backgroundColor: '#fff',

        // paddingLeft: 20,
        fontSize: 18,

    }
})

