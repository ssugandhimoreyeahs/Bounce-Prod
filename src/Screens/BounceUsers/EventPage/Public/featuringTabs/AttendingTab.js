import React from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from '@components'
import { Girl } from '@assets';
const DATA = [
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
    },

];

export default function AttendingTab() {
    return (
        <View>
            <SearchBar
                cb={() => {
                    scrollRef.current.scrollToEnd({ animated: true })
                }}
                // heading={'Contacts'}
                // cohost
                placeholder={"Search"}
                dataList={DATA}
                // parentState={() => setVendor(!getVendor)}
                filterSmallButtons={["All", "Interested"]}
                mutual
            />

        </View>
    )
}
