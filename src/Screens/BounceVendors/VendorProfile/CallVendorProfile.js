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
import { observer } from 'mobx-react';
import {
    Container,
    Header as NativeHeader,
    Content,
    Tab,
    Tabs
} from 'native-base';
import MobxStore from '../../../mobx'
import { vendorProfile } from '../../../reducer/CurrentData';
import navigation from '../../../navigation';


const { width } = Dimensions.get("window");
const height = width * 100 / 60;

function CallVendorProfile(props) {
    const { userProfile: userinfo } = MobxStore.authStore;
    const token = userinfo?.token;
    const [loader, setLoader] = useState(false)
    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const FooterRef = useRef(null)
    const [allVendorsProfiles, setAllVendorsProfile] = useState([]);

    // console.log('ALL_VENDOR_PROFILE_MAP - ', JSON.stringify(allVendorsProfiles));
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



    const fetchProfile = async () => {
        setLoader(true)
        // let SERVER_RESPONSE = await ApiClient.instance.get(ApiClient.endPoints.vendorList);
        let SERVER_RESPONSE = await axios.get('http://3.12.168.164:3000/vendor', {
            headers: {
                'Authorization': `Bearer ` + `${token}`
            }
        })
        console.log("SERVER_RESPONSE", JSON.stringify(SERVER_RESPONSE.data));
        if (!(SERVER_RESPONSE.statusCode == 401)) {
            setAllVendorsProfile(SERVER_RESPONSE.data);
        }
        setLoader(false)
    }

    const handleCarousel = (item) => {
        console.log('item per item', item)
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
            navigation={props.navigation}
        />
    }

    // const handleCarousel = ({ item, index }) => {
    //     console.log('item per item', item)
    //     console.log('indexxxx', index)
    //     return (
    //     // <Tab tabStyle={{ backgroundColor: '#fff' }}
    //     //     textStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }}
    //     //     activeTabStyle={{ backgroundColor: '#fff' }}
    //     //     activeTextStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }} heading={"Events"}>
    //         <VendorProfile
    //             ref={FooterRef}
    //             item={item}
    //             imageArray={getMedia == null ? [] : getMedia}
    //             onSnapToItem={(index) => setState(index)}
    //             state={getState}
    //             key={index}
    //             arrayLength={allVendorsProfiles.length}
    //             onPressPrevious={onPressPrevious}
    //             onPressNext={onPressNext}
    //         />
    //     // </Tab>
    //     )
    // }



    // return (<View style={{ flex: 1 }}>
    //     <Container>
    //         <Tabs
    //             tabBarUnderlineStyle={{ backgroundColor: '#000000' }}>
    //             {!loader &&
    //                 allVendorsProfiles.map((item, index) => {
    //                     return handleCarousel({ item, index })
    //                 })
    //             }

    //                 {/* <VendorProfile
    //                     item={allVendorsProfiles[0]}
    //                     imageArray={getMedia == null ? [] : getMedia}
    //                     //onSnapToItem={(index) => setState(index)}
    //                     state={getState}
    //                     //key={index}
    //                     arrayLength={allVendorsProfiles.length}
    //                 //onPressPrevious={onPressPrevious}
    //                 //onPressNext={onPressNext}
    //                 /> */}

    //         </Tabs>
    //     </Container>
    // </View>
    // );

    return (<>
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
CallVendorProfile.routeName = "/CallVendorProfile";
export default observer(CallVendorProfile)