import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import { Header, SearchBar, PreviewCard, CustomButton } from '@components'
import { Interested, Going, Arrived, CantGo } from '@assets';
import { Music, Food, Security, Video, Drinks } from '@assets';

const DATA = [
    {
        title: "Michael’s Event Rentals",
        stars: "4.9",
        rates: "800",
        imageBottomLeftText:"Velvet Tufted Bench - Black",
        imageBottomRightRate:"325"
    },
    {
        title: "Enchanted Rentals",
        stars: "4.9",
        rates: "800",
        imageBottomLeftText:"Arch - Grand Viole Chuppa",
        imageBottomRightRate:"325"
    },
    {
        title: "Pico Party Event Rentals",
        stars: "4.9",
        rates: "800",
        imageBottomLeftText:"Child Height Vintage Table",
        imageBottomRightRate:"325"
    },
]

export default function MusicVendor() {
    const [getState, setState] = React.useState(true)
    const [getVendor, setVendor] = React.useState(true)
    const FooterRef = useRef(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)

    const renderItem = ({ item }) => {
        // console.log("TITLE ", item.title)
        return (<View>
            <PreviewCard
                title={item.title}
                stars={item.stars}
                rates={item.rates}
                imageBottomLeftText={item.imageBottomLeftText}
                imageBottomRightRate={item.imageBottomRightRate}
            />
        </View>)
    };
    return (
        <View style={styles.container}>
            <ScrollView >
                <Header
                    back
                    headerTitle={"Event Rentals"}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <SearchBar
                        placeholder={"Search"}
                        // dataList={DATA}
                        parentState={() => setVendor(!getVendor)}

                    />
                 
                    <Text style={styles.reviewsTitleStyle}>
                        Favourites
                    </Text>
                    <View>

                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={(index) => index}
                            extraData={selectedId}
                        />

                    </View>
                </View>
            </ScrollView>
            <CustomButton
                Pay
                ButtonTitle={"Continue"}
                ContainerStyle={{ backgroundColor: '#000000', paddingVertical: 5 }}
                ButtonStyle={{ backgroundColor: '#1FAEF7', borderRadius: 10, }}
                TitleStyle={[styles.TitleStyle, {color:'#fff', paddingVertical: 5, fontSize: 22, letterSpacing: 1.5 }]}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1
    },
    ContainerStyle: {
        // alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 5
    },
    ButtonStyle: {
        // width: '10%',
        borderRadius: 24,
        backgroundColor: '#1FAEF7',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    TitleStyle: {
        fontSize: 15,
        color: '#000'
    },
    reviewsTitleStyle: {
        marginVertical: 10,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing:1.2
    },
})