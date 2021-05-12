import React, { useEffect, useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { DollarWhite, Food, Security, Video, Drinks } from '@assets';
import { FONTSIZE, getHp, getWp } from '@utils'
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { connect, useSelector, useDispatch } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { FlatList } from 'react-native';
import VendorProfile from './index'
import { fetchGet, getData, postData } from '../../../FetchServices'
import { ApiClient } from '../../../app/services'

const { width } = Dimensions.get("window");
const height = width * 100 / 60;

export default function CallVendorProfile(props) {
    const [loader, setLoader] = useState(false)
    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const FooterRef = useRef(null)
    const {
        allVendorsProfiles = {}
    } = useSelector((state) => state.mainExpenseByCategory);

    // console.log("allVendorsProfiles", allVendorsProfiles)
    // const { fullName, city, about, vendorCategoryName, language, username, numberOfRatings, profileImage, vendor = {} } = allVendorsProfiles
    // const { equipment, cuisines, hourlyRate, services, armed, website, genres, guardCertification } = vendor

    const onPressPrevious = () => {
        FooterRef.current.scrollToIndex({ animated: true, index: getIndex == 0 ? 0 : getIndex - 1 });
        { getIndex != 0 ? setIndex(getIndex - 1) : null }

    };
    const onPressNext = () => {
        FooterRef.current.scrollToIndex({ animated: true, index: getIndex == allVendorsProfiles.length - 1 ? allVendorsProfiles.length - 1 : getIndex + 1 });
        { getIndex != allVendorsProfiles.length - 1 ? setIndex(getIndex + 1) : null }
    };

    useEffect(() => {
        fetchProfile()
    }, [])
    // var LENGTH = 0
    const fetchProfile = async () => {
        setLoader(true)
        let SERVER_RESPONSE = await ApiClient.instance.get(ApiClient.endPoints.vendorList);

        if (!(SERVER_RESPONSE.statusCode == 401)) {
            dispatch(fetchVendorData(["ALL_VENDORS_PROFILES", SERVER_RESPONSE]))
            setLoader(false)
        }
        setLoader(false)
    }
    const handleCarousel = (item) => {
        // console.log(' fullArray.length :', fullArray)
        // console.log("THIS IS LEGNTH", LENGTH);
        return <VendorProfile
            ref={FooterRef}
            item={item}
            imageArray={getMedia == null ? [] : getMedia}
            onSnapToItem={(index) => setState(index)}
            state={getState}
            key={item.index}
            arrayLength={allVendorsProfiles.length}
            onPressPrevious={onPressPrevious}
            onPressNext={onPressNext}
        />
    }
    return (
        <>
            <Carousel
                // ref={(c) => { carousel = c; }}
                data={allVendorsProfiles}
                renderItem={handleCarousel}
                sliderWidth={width}
                itemWidth={width}
                keyExtractor={index => index}
                initialScrollIndex={0}
                onSnapToItem={(index) => setState(index)}
                ref={FooterRef}
                extraData={selectedId}
            />
        </>
    );
}
const styles = StyleSheet.create({
    friendsImage: {
        width: getWp(100),
        height: getHp(100),
        margin: 2
    },
    friendsView: {
        backgroundColor: '#fff',
        borderRadius: 7,
        alignItems: 'center',
        elevation: 5,
        marginVertical: 10
    },
    textImage: {
        color: '#000',
        fontSize: FONTSIZE.Text15,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    fullInventoryTitleStyle: {
        color: '#fff',
        fontSize: 18,
        opacity: 0.8,
        marginRight: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 0
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#212121',
        padding: 10
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        color: '#fff',
        fontSize: 20,
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