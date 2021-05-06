import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import {
    BouncePro,
    RightBlue
} from '@assets'
import { DoubleTextButton } from '@components';

export default function Subscription(props) {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerView}>
                    <Text style={styles.eventTitleStyle}>Don’t advertise to just anyone.
Target the people who hire you.</Text>
                </View>
                <View>
                    <View style={styles.subContainer}>
                        <Image source={BouncePro} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={RightBlue} />
                            <Text style={styles.correctTextStyle}>Feature your profile on event pages</Text>
                        </View>
                    </View>
                    <DoubleTextButton
                        floatingLabel={"Standard Price"}
                        ButtonTitle2={"$12 / month"}
                        ContainerStyle={styles.ContainerStyle}
                        ButtonStyle={styles.ButtonStyle}
                        Title1Style={styles.Title1Style}
                        Title2Style={styles.Title2Style}
                    />
                    <DoubleTextButton
                        floatingLabel={"$144"}
                        ButtonTitle2={"$12 / month"}
                        ContainerStyle={styles.ContainerStyle}
                        ButtonStyle={[styles.ButtonStyle, { backgroundColor: '#1FAEF7' }]}
                        Title1Style={[styles.Title1Style, { fontSize: 22, color: '#424242', fontWeight: 'bold', textDecorationLine: 'line-through' }]}
                        Title2Style={styles.Title2Style}
                    />

                    <View style={{backgroundColor:'#292929',padding:10}}>
                        <Text style={styles.lastLine}>Plans automatically renew until canceled</Text>
                    </View>

                
                </View>

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    subContainer: {
        borderWidth:2,
        borderColor:'#00ABFF',
        marginVertical: 10,
        backgroundColor: "#016A9E",
        // backdrop: blur(44px)
        /* Note: backdrop-filter has minimal browser support */
        // justifyContent:'center',
        alignItems: 'center',
        borderRadius: 30,
        paddingVertical: 20
    },
    lastLine: {
        color: "#FFFFFF",
        fontSize: 16,
        
        // width: '60%',
        // letterSpacing: 0.6,
        textAlign: 'center',
        // lineHeight: 28,
        opacity: 0.4
    },
    headerView: {
        // backgroundColor: '#242424',
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
        width: '60%',
        letterSpacing: 0.6,
        textAlign: 'left',
        lineHeight: 28,
        opacity: 0.9
    },
    eventTitleStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        // width:'40%',
        // fontWeight: 'bold'
        textAlign: 'center',
        lineHeight: 28,
        opacity: 0.9
    },
    ContainerStyle: {
        // width: '100%',
        // alignSelf: 'center',
        // backgroundColor: 'red'
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        justifyContent: 'space-around',
        flexDirection: 'row',
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