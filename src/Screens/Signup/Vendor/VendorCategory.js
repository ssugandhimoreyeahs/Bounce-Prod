import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Header, Scaffold } from '@components'
import { getData } from '../../../FetchServices'
import { FONTSIZE, getHp, getWp } from '@utils'
import { useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
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
import { ApiClient } from '../../../app/services';
import VendorSignup from './VendorSignup';
import { Toast } from '@constants';

export default function VendorCategory(props) {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    const [vendorList, setVendorList] = useState(null)

    const fetchData = async () => {
        try {
            let categoryResponse = await ApiClient.instance.get(ApiClient.endPoints.getCategory);
            setVendorList(categoryResponse.data)
            setLoader(false);
        } catch (error) {
            setLoader(false);
            return Alert.alert("Message", "Something went wrong!");
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderItem = ({ item, index }) => {
        return (<TouchableOpacity key={index}
            onPress={() => {
                dispatch(fetchVendorData(["VENDOR_TYPE", item.vendorCategory]))
                props.navigation.navigate(VendorSignup.routeName);
            }} >

            <View style={styles.iconStyle}>
                {
                    item.categoryImage != undefined &&
                    <SvgUri
                        width={"40"}
                        height={"40"}
                        uri={item.categoryImage}
                    />
                }
                <Text style={styles.categoryStyle}>
                    {item.vendorCategory}
                </Text>
            </View>

            {!(index + 1 == vendorList.length) &&
                <View
                    style={{ borderWidth: 0.5, borderColor: '#DDDDDD' }} />}
        </TouchableOpacity>
        )
    }
    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#F4F4F4' }}>
        <Spinner visible={loader} color={'#1FAEF7'} />
        { !loader &&
            < View style={styles.container}>
                <ScrollView>
                    <Header
                        headerBackColor={{ paddingBottom: 20, backgroundColor: 'rgba(238, 238, 238, 0.5)' }}
                        back
                        headerTitle={"Select Business"}
                        onPress={() => props.navigation.goBack()}
                    />
                    <FlatList
                        data={vendorList}
                        renderItem={renderItem}
                        keyExtractor={(index) => index}
                    />
                </ScrollView>
            </View>}
    </Scaffold>
    )
}
VendorCategory.routeName = "/VendorCategory";
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
        backgroundColor: '#FBFBFB',
        marginVertical: 1
    },
    container: {
        backgroundColor: '#FBFBFB',
        flex: 1
    },
})
