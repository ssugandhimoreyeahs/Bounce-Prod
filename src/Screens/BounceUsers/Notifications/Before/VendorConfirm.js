import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, SearchBar, CustomButton, TouchableButton, VendorRequest } from '@components'
import { Message, Delete, ThreeDots, Girl, DJ } from '@assets';
import { Avatar } from 'react-native-elements'
export default function VendorConfirm() {
    return (
        <View style={styles.container}>

            <ScrollView >
                <Header

                    headerTitle={"Confirm"}
                    headerBackColor={{ backgroundColor: '#000000' }}
                />
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Avatar
                            source={DJ}
                            size='large'
                            rounded

                        />
                        <Text style={{ color: '#FFFFFF', fontSize: 22, marginLeft: 40 }}>Alexis Sears</Text>
                    </View>

                    <Text style={{ marginBottom:200,marginTop: 10, color: '#FFFFFF', fontSize: 18, letterSpacing: 0.02, lineHeight: 30 }}>Hiring this vendor wil place him inside the ‘Featuring’ section in your event page, and will confirm the terms agreed upon by both parties.</Text>

                   
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                        <CustomButton
                            Pay
                            ButtonTitle={"Cancel"}
                            ContainerStyle={{ paddingVertical: 5 }}
                            ButtonStyle={{ borderRadius: 24, backgroundColor: '#333333', paddingVertical: 20 }}
                            TitleStyle={styles.TitleStyle}
                        />
                        <CustomButton
                            Pay
                            ButtonTitle={"Hire"}
                            ContainerStyle={{ paddingVertical: 5 }}
                            ButtonStyle={{ borderRadius: 24, backgroundColor: '#1FAEF7', paddingVertical: 20 }}
                            TitleStyle={styles.TitleStyle}
                        />
                    </View>
        </View>
    )
}
const styles = StyleSheet.create({
    TitleStyle: {
        fontSize: 22
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