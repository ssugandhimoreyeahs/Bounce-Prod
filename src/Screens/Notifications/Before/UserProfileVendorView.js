import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Header, VendorRequest } from '@components'


export default function UserProfileVendorView() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Header
                    back
                    headerTitle={"Vendor Request"}
                    headerBackColor={{ backgroundColor: '#000000' }}
                />
                <VendorRequest />
                <VendorRequest />
                <VendorRequest />
            </ScrollView>
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