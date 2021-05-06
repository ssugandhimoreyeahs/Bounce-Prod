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
import { TapRating, CustomText } from '@components'

export default function BlackCard(props) {
    const {
        REVIEWSTACK
    } = props


    const renderItem = ({ item,index }) => {
        const { name, reviewText, icon } = item
        return (
            <View style={styles.blueNotificationCard} key={index} >

                <View style={[styles.flexDirectionStyle, { width: '48%' }]}>
                    <Avatar source={icon} size="medium" rounded />
                    <Text style={[styles.textStyle, { marginLeft: 0 }]}>{name}</Text>
                </View>

                <TapRating
                    styleProp={{ backgroundColor: '#fff' }}
                    StarSize={22}
                />
                 <Text style={[styles.textStyle, { marginLeft: 0 }]}>{reviewText}</Text>

                <CustomText
                    styleProp={{ color: '#000' }}
                    TextData={"DJ Nathan made my wedding a night to remember! He knows what every crowd wants to hear. Mixing music unlike any other "}
                />

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={REVIEWSTACK}
                renderItem={renderItem}
                keyExtractor={(index) => index}
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
    container: {
        // padding: 10,
        backgroundColor: '#fff',
        marginVertical: 10
    },
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
        width: '95%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 10,
        // backgroundColor: 'radial - gradient(76.22 % 76.22 % at 50 % 23.78 %, rgba(31, 174, 247, 0.69) 0 %, rgba(31, 174, 247, 0.5) 100 %, rgba(31, 174, 247, 0.42) 100 %)',
        padding: 15,
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


    TextInputStyle: {
        backgroundColor: '#fff',

        // paddingLeft: 20,
        fontSize: 18,

    }
})

