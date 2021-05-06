import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import { Header, RenderSmallButton, PreviewCard, CustomButton } from '@components'
import { Interested, Going, Arrived, CantGo } from '@assets';
import { Music, Food, Security, Video, Drinks } from '@assets';
import { Searchbar } from 'react-native-paper';
import { FONTSIZE, getHp, getWp } from '@utils'
const DATA = [
    {
        title: "DJ DZ",
        stars: "4.9",
        rates: "800",

    },
    {
        title: "DJ DZ",
        stars: "4.9",
        rates: "800",

    },
    {
        title: "DJ DZ",
        stars: "4.9",
        rates: "800",

    },
]

export default function MusicVendor() {
    const [getState, setState] = React.useState(true)
    const [getVendor, setVendor] = React.useState(true)
    const FooterRef = useRef(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const renderItem = ({ item }) => {
        // console.log("TITLE ", item.title)
        return (<View>
            <PreviewCard
                title={item.title}
                stars={item.stars}
                rates={item.rates}
            />
        </View>)
    };
    return (
        <View style={styles.container}>
            <ScrollView >
                <Header
                    back
                    headerTitle={"Music"}
                />
                <View style={{ paddingHorizontal: 10, backgroundColor: '#F2F2F2' }}>
                    <Searchbar
                        placeholder={"Search"}
                        // onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{ borderRadius: 24, backgroundColor: '#fff', marginBottom: 0, fontSize: FONTSIZE.Text24, margin: getWp(10) }}
                        iconColor={"#000"}
                        placeholderTextColor={"#808080"}
                    />
                    <RenderSmallButton item={'All'} />
                    {/* <RenderSmallButton item={`DJ's`}  />
                    <RenderSmallButton item={'Brands'}  /> */}
                    {/* <View style={{ flexDirection: 'row' }}>
                        <CustomButton
                            Pay
                            ButtonTitle={"All"}
                            ContainerStyle={styles.ContainerStyle}
                            ButtonStyle={styles.ButtonStyle}
                            TitleStyle={styles.TitleStyle}
                        />
                        <CustomButton
                            Pay
                            ButtonTitle={"DJs"}
                            ContainerStyle={styles.ContainerStyle}
                            ButtonStyle={styles.ButtonStyle}
                            TitleStyle={styles.TitleStyle}
                        />
                        <CustomButton
                            Pay
                            ButtonTitle={"Brands"}
                            ContainerStyle={styles.ContainerStyle}
                            ButtonStyle={styles.ButtonStyle}
                            TitleStyle={styles.TitleStyle}
                        />
                    </View> */}
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
                <View style={{ paddingHorizontal: getWp(10) }}>
                    <CustomButton
                        complete
                        bar
                        ButtonTitle={"Continue"}
                    />
                </View>
            </ScrollView>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        color: '#fff'
    },
    reviewsTitleStyle: {
        marginVertical: 30,
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
})