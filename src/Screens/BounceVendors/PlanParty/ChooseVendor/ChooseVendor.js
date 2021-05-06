import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Header, Root, ChooseVendorCard } from '@components'
import { getData } from '../../../../FetchServices'
import { FONTSIZE, getHp, getWp } from '@utils'
import { useDispatch } from "react-redux";
import { fetchVendorData } from "../../../../reducer/mainexpensecategory";
import {
    Food,
    Security,
    Bartender,
    DjMusic,
    Cleaning,
    PartyRentals,
    Videographer,
} from '@svg'
import Spinner from 'react-native-loading-spinner-overlay';
import { SvgUri } from 'react-native-svg';
import { Searchbar } from 'react-native-paper';
import { Girl } from '@assets';

const DATA = [
    {
        icon: Girl,
        messageName: "Jessica Lambert",
        rating: '4.9'
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
        rating: '4.9'
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
        rating: '4.9'
    },
    {
        icon: Girl,
        messageName: "Jessica Lambert",
        rating: '4.9'
    },

];

export default function Signup(props) {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    const [vendorList, setVendorList] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const fetchData = async () => {

        let res = await getData('Vendor/Category')
        setVendorList(res)
        setLoader(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderItem = ({ item, index }) => {
        // console.log(item.categoryImage);
        return (<TouchableOpacity key={index}
            onPress={() => {
                dispatch(fetchVendorData(["VENDOR_TYPE", item.vendorCategory]))
                props.navigation.navigate("DjSignup", {
                    ROUTE: 'SIGNUP'
                })
            }} >

            <View style={styles.iconStyle}>
                {
                    item.categoryImage != undefined &&
                    <SvgUri
                        width="40"
                        height="40"
                        uri={item.categoryImage}
                    />
                }
                <Text style={styles.categoryStyle}>
                    {item.vendorCategory}
                </Text>
            </View>

            {!(index + 1 == vendorList.length) &&
                <View
                    style={{ borderWidth: 0.5, borderColor: '#CCCCCC' }} />}
        </TouchableOpacity>
        )
    }
    const renderCard = ({ item }) => {
        return <ChooseVendorCard item={item} />
    }
    //choose vendors card are in Breaked components
    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            { !loader &&
                < View style={styles.container}>
                    <ScrollView>
                        <Header
                            HeaderBackColor={{ backgroundColor: 'rgba(238, 238, 238, 0.5)' }}
                            back
                            headerTitle={"Choose Vendors"}
                            onPress={() => props.navigation.goBack()}
                        />
                        <Searchbar
                            placeholder={"Search"}
                            // onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={{ borderRadius: 24, backgroundColor: '#fff', marginTop: 5, marginBottom: 20, fontSize: FONTSIZE.Text24, marginHorizontal: getWp(10) }}
                            iconColor={"#000"}
                            placeholderTextColor={"#808080"}
                        />
                        {/* flatlist for vendor card */}
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={DATA}
                            renderItem={(item) => renderCard(item)}
                            keyExtractor={(index) => index}
                        />
                        {/* Vendor categories */}
                        <FlatList
                            data={vendorList}
                            renderItem={renderItem}
                            keyExtractor={(index) => index}
                        />

                    </ScrollView>
                </View>}
        </Root >
    )
}

const styles = StyleSheet.create({
    categoryStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text18,
        marginLeft: 40,
        fontFamily: 'AvenirNext',
        marginVertical: getHp(20)
    },
    iconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#fff',
        marginVertical: 1
    },
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
})
