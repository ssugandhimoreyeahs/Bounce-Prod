import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView,TextInput } from 'react-native'
import { Header, BlueCard, BlackCard, Footer, TapRating } from '@components'
import { Avatar } from 'react-native-elements'
import {
    Peoples,
    Message,
    WhiteDownload,
    WhiteParty,
    Girl
} from '@assets'

export default function FinalReviews() {

 
    return (
        <View style={styles.container}>
      
                <Header
                    back
                />
                 <View style={{ padding: 15,alignItems:'center' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 22, paddingBottom: 10 }}>{"DJ / MC Shai Peri"}</Text>
                        <TapRating StarSize={18} />
                    </View>
                    <TextInput
                            placeholder={"Your Review"}
                            style={styles.TextInputStyle}
                            placeholderTextColor={"#909090"}
                        />
               
        </View>
    )
}

const styles = StyleSheet.create({

    blackNotificationCard: {
        backgroundColor: "#272727",
        borderRadius: 15,
        padding: 20,
        marginVertical: 10
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold'
    },
    commentLineTextStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        opacity: 0.8,
        alignSelf: 'center'
    },
    commentTextStyle: {
        color: "#FFFFFF",
        fontSize: 20,
        paddingVertical: 20,
        fontWeight: 'normal'
    },
    container: {
        backgroundColor: '#000000',
        flex:1,
    },
    TextInputStyle: {
        backgroundColor: '#1A1A1A',
        borderRadius: 24,
        paddingLeft: 20,
        fontSize: 16
    }
})

