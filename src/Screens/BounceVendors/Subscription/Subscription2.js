import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import {
    BouncePro,
    RightBlue
} from '@assets'
import { DoubleTextButton } from '@components';

export default function Subscription2(props) {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.subContainer}>
                    <Image source={BouncePro} />
                    <View style={{ position: 'absolute', bottom: 30, right: 30 }}>
                        <Text style={styles.correctTextStyle}>Renews February 1, 2021</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', paddingVertical: 40,marginTop:400}}>
                <Text style={[styles.correctTextStyle, { fontSize: 26,paddingBottom:18 }]}>Switch Plans & Save</Text>
                <DoubleTextButton
                    floatingLabel={"$144"}
                    ButtonTitle2={"$100 / month"}
                    ContainerStyle={styles.ContainerStyle}
                    ButtonStyle={[styles.ButtonStyle, { backgroundColor: '#1FAEF7' }]}
                    Title1Style={[styles.Title1Style, { fontSize: 22, color: '#424242', fontWeight: 'bold', textDecorationLine: 'line-through' }]}
                    Title2Style={styles.Title2Style}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#016A9E',

    },
    subContainer: {
        borderWidth: 2,
        borderColor: '#000000',
        marginVertical: 10,
        backgroundColor: "#000000",
        width: '90%',
            alignSelf: 'center',
        borderRadius: 30,
        padding: 15,
    },
    lastLine: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.4
    },
    headerView: {
        width: '70%',
        alignSelf: 'center',
        padding: 10
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    correctTextStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        letterSpacing: 0.6,
        textAlign: 'left',
        lineHeight: 28,
        opacity: 0.9
    },
    eventTitleStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 28,
        opacity: 0.9
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 22,
        paddingVertical: 20,
        marginVertical: 10
    },
    Title1Style: {
        fontSize: 18,
        opacity: 0.8,
        color: '#fff'
    },
    Title2Style: {
        fontSize: 22,
        // opacity:0.8,
        fontWeight: 'bold',
        color: '#fff'
    },
})