import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import {
    Header,
    Root,
    VendorCard,
    CustomButton
} from '@components'
import { getData } from '../../../../FetchServices'
import { FONTSIZE, getHp, getWp } from '@utils'
import { useDispatch } from "react-redux";
import { fetchVendorData } from "../../../../reducer/mainexpensecategory";

import Spinner from 'react-native-loading-spinner-overlay';
import { SvgUri } from 'react-native-svg';
import { Searchbar } from 'react-native-paper';
import { Girl } from '@assets';

const DATA = [
    {
        icon: Girl,
        name: "Jessica Lambert",
        city: "Los Angeeless",
        rating: '4.9',
        price: '25',
        desc: 'I am an assertive, formal but polite security officer. I am a great observer, and can de-escelate a situation.'
    },
    {
        icon: Girl,
        name: "Jessica Lambert",
        city: "Los Angeeless",
        rating: '4.9',
        price: '25',
        desc: 'I am an assertive, formal but polite security officer. I am a great observer, and can de-escelate a situation.'
    },
    {
        icon: Girl,
        name: "Jessica Lambert",
        city: "Los Angeeless",
        rating: '4.9',
        price: '25',
        desc: 'I am an assertive, formal but polite security officer. I am a great observer, and can de-escelate a situation.'
    },
    {
        icon: Girl,
        name: "Jessica Lambert",
        city: "Los Angeeless",
        rating: '4.9',
        price: '25',
        desc: 'I am an assertive, formal but polite security officer. I am a great observer, and can de-escelate a situation.'
    },

];

export default function VendorSearch(props) {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            { !loader &&
                < View style={styles.container}>
                    <ScrollView>
                        <Header
                            headerBackColor={{ backgroundColor: 'rgba(238, 238, 238, 0.5)' }}
                            back
                            headerTitle={"Choose Vendors"}
                            onPress={() => props.navigation.goBack()}
                        />
                        <Searchbar
                            placeholder={"Search"}
                            // onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={{ borderRadius: 13, backgroundColor: '#fff', marginTop: 5, marginBottom: 20, fontSize: FONTSIZE.Text24, marginHorizontal: getWp(10) }}
                            iconColor={"#000"}
                            placeholderTextColor={"#808080"}
                        />
                        {/* flatlist for vendor card */}
                        <FlatList
                            showsHorizontalScrollIndicator={false}

                            data={DATA}
                            renderItem={(item) => <VendorCard item={item} />}
                            keyExtractor={(index) => index}
                        />
                        <CustomButton
                            complete
                            bar
                            ButtonTitle={"Selected"}
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
        fontFamily: 'AvenirNext-Regular',
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
        backgroundColor: '#F2F5F6',
        flex: 1
    },
})
