import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Header, Root } from '@components'
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

const DATA = [
    { icon: <DjMusic height={getHp(52)} width={getHp(52)} /> },
    { icon: <Food height={getHp(52)} width={getHp(52)} /> },
    { icon: <Bartender height={getHp(52)} width={getHp(52)} /> },
    { icon: <Videographer height={getHp(52)} width={getHp(52)} /> },
    { icon: <Security height={getHp(52)} width={getHp(52)} /> },
    { icon: <Cleaning height={getHp(52)} width={getHp(52)} /> },
    { icon: <PartyRentals height={getHp(52)} width={getHp(52)} /> },
];

export default function Signup(props) {

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
                    style={{ borderWidth: 0.5, borderColor: '#DDDDDD' }} />}
        </TouchableOpacity>
        )
    }
    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            { !loader &&
                < View style={styles.container}>
                    <ScrollView>
                        <Header
                            headerBackColor={{ backgroundColor: 'rgba(238, 238, 238, 0.5)' }}
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
        backgroundColor: '#FBFBFB',
        marginVertical: 1
    },
    container: {
        backgroundColor: '#FBFBFB',
        flex: 1
    },
})
