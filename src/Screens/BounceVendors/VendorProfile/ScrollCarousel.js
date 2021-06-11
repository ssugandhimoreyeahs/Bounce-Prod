import React, { useEffect, useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { DollarWhite, Food, Security, Video, Drinks } from '@assets';
import { FONTSIZE, getHp, getWp } from '@utils'
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import { connect, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import VendorProfile from './index'
import { observer } from 'mobx-react';
import MobxStore from '../../../mobx'
import { Scaffold } from '@components'
import { Container, Header as NativeHeader, Content, Tab, Tabs } from 'native-base';


const { width } = Dimensions.get("window");
const height = width * 100 / 60;

function ScrollCarousel(props) {

    const { userProfile: userinfo } = MobxStore.authStore;
    const token = userinfo?.token;
    const [loader, setLoader] = useState(false)
    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const FooterRef = useRef([])
    const [allVendorsProfiles, setAllVendorsProfile] = useState([]);
    const [page, setPage] = useState(0);
    const onPressPrevious = () => {
        if (page == 0) {
            return false;
        }
        setPage(i => i -= 1);
    };

    const onPressNext = () => {
        if (page == allVendorsProfiles.length) {
            return false;
        }
        setPage(i => i += 1);
    };


    useEffect(() => {
        fetchProfile()
    }, [])


    const fetchProfile = async () => {
        setLoader(i => !i);
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
        setLoader(i => !i);
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



    if (loader || allVendorsProfiles.length == 0) {
        return false;
    }
    console.log('TEST - ', allVendorsProfiles);


    return (<Scaffold
        statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
        <Tabs
            onScroll={(event) => {
                console.log("JSONEVE_checl - " + JSON.stringify(event));
                let isTrue = Number.isInteger(parseInt(JSON.stringify(event)));
                if (!isTrue) {
                    return;
                }
               setTimeout(()=>{
                setPage((i) => {
                    return parseInt(JSON.stringify(event))
                });
               }, 100);
            }}
            page={page}
            tabBarUnderlineStyle={{ height: 0 }}
            initialPage={0}
            tabContainerStyle={{ height: 0 }}
            style={{ flex: 1 }}>
            {
                allVendorsProfiles.map((item, index) => {
                    return <Tab
                        heading={<View></View>}
                    >
                        {handleCarousel({ item, index })}
                    </Tab>;
                })
            }
        </Tabs>
        {/* <ScrollView
            onScroll={onScroll}
            pagingEnabled
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEventThrottle={1000}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={FooterRef}
        >
            {!loader &&
                allVendorsProfiles.map((item, index) => {
                    return handleCarousel({ item, index })
                })
            }
        </ScrollView> */}
    </Scaffold>
    );
}


ScrollCarousel.routeName = "/ScrollCarousel";
export default observer(ScrollCarousel)