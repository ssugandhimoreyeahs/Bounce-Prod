import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Header, ImageCarousel, IconTitle, Root, Footer, CustomText } from '@components'
import {
    Message,
    Favourite,
} from '@assets'
import { styles } from './indexCss';
import {
    AddBlueWhite,
    TagPrice,
    PlusWhiteCalender,
    StarWhite,
    DollarOnlyWhite,
    WebsiteBlack,
    BlackMenubar,
    Certified,
    Armed,
    Multilingual,
    Services,
    Cuisines,
    Equipments,
    BlackOutlineShare
} from '@svg'
import Ratings from '../../../components/RatingStar/Ratings'
import { Avatar } from 'react-native-elements'
// import { handleImage } from '@components/ImageVideoPlaceholder'
import ImagePicker from 'react-native-image-crop-picker';
import { ImageStore } from 'react-native';
import { FONTSIZE } from '@utils'
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import Spinner from 'react-native-loading-spinner-overlay';
import { pickDocument } from '@hooks'
import { fetchGet, getData, postData } from '../../../FetchServices'
import axios from 'axios';


const DATA = [
    {
        id: "0",
        icon: Favourite,
        messageName: "Favourite",
    },
    {
        id: "1",
        icon: Message,
        messageName: "Message",
    },

];

export default function VendorProfile(props) {
    console.log("PROPS ON VENDOR PROFILE :", props);
    const dispatch = useDispatch()

    const { item, index={} } = props?.item || props?.route?.params
    const { arrayLength, onPressPrevious, onPressNext } = props
    console.log("INSIDE ITEM", item);

    const { fullName, city, about, vendorCategoryName, language, username, numberOfRatings, profileImage, vendor = {},guardCertification } = item

    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={getMedia == null ? [] : getMedia}
            onSnapToItem={(index) => setState(index)}
            state={getState}
        />
    }

    return (
        <Root>
            <View style={styles.container} >

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <Spinner visible={loader} color={'#1FAEF7'} />
                    {!loader &&
                        <>
                            <Header
                                // headerTitle={"DJ Nathan"}
                                share={<BlackOutlineShare height={25} width={25} />}
                                back
                                onPress={() => props.navigation.goBack()}
                                headerBackColor={{ backgroundColor: '#fff' }}
                            />
                            <View style={styles.subContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                    {profileImage != null ?
                                        <Avatar
                                            source={{ uri: `${profileImage.filePath}` }}
                                            size='medium'
                                            rounded
                                        /> : null
                                    }

                                    <View style={{ paddingLeft: 15 }}>
                                        {fullName !== null ?
                                            <Text style={{ color: '#000', fontSize: FONTSIZE.Text20, }}>{fullName}</Text>
                                            : null
                                        }
                                        {city !== null ?
                                            <Text style={{ color: '#696969', fontSize: FONTSIZE.Text14, }}>{city}</Text>
                                            : null
                                        }


                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                                    <Ratings
                                        rating={0}
                                    />

                                    {vendor?.hourlyRate != null &&
                                        vendorCategoryName !== "Party Rental" ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                                            <View style={{ backgroundColor: '#00E08F', borderRadius: 5, padding: 2 }}>
                                                <DollarOnlyWhite height={20} width={20} />
                                            </View>
                                            {
                                                vendorCategoryName == "DJ"

                                                    ?
                                                    <>
                                                        <Text style={{ color: '#000', fontSize: FONTSIZE.Text18, marginLeft: 5 }}>{vendor?.hourlyRate} / hour</Text>

                                                        <Text style={{ color: '#696969', fontSize: FONTSIZE.Text14, marginLeft: 5 }}> (Base Package)</Text>
                                                    </>
                                                    :

                                                    vendorCategoryName == "Catering" ?
                                                        <>
                                                            <Text style={{ color: '#000', fontSize: FONTSIZE.Text18, marginLeft: 5 }}>{vendor?.hourlyRate} / guest</Text>

                                                            <Text style={{ color: '#696969', fontSize: FONTSIZE.Text14, marginLeft: 5 }}> (Base Package)</Text>
                                                        </>
                                                        :
                                                        <Text style={{ color: '#000', fontSize: FONTSIZE.Text18, marginLeft: 5 }}>{vendor?.hourlyRate} / hour</Text>
                                            }
                                        </View>
                                        : null
                                    }
                                </View>

                                {about != null ? <CustomText
                                    TextData={about}
                                    styleProp={{ color: '#000' }}
                                /> : null}

                                {vendor?.website != null ?
                                    <View style={styles.websiteView}>
                                        <WebsiteBlack height={24} width={24} />
                                        <Text onPress={() => Linking.openURL(`${vendor?.website}`)} style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text16, marginLeft: 10, textDecorationLine: 'underline' }}>{vendor?.website}</Text>
                                    </View>
                                    : null
                                }

                                {/* 
                            {!(profileImage == null) ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000', fontSize: FONTSIZE.Text24, marginLeft: 0 }}>Media</Text>
                                    <TouchableOpacity onPress={handleImage} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AddBlueWhite height={20} width={20} />
                                            <Text style={{ color: '#000', fontSize: FONTSIZE.Text20, marginLeft: 10, }}>Add</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                :
                                <View  >
                                    {vendorCategoryName !== 'Bartender' &&
                                        vendorCategoryName !== 'Catering' &&
                                        vendorCategoryName !== 'Event Rentals' ?
                                        <TouchableOpacity onPress={handleImage} style={styles.addMediaButton} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <AddBlueWhite height={20} width={20} />
                                                <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, marginLeft: 10, }}> {'Add Media'} </Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <>
                                            {getPdf != null ?
                                                <>
                                                    <TouchableOpacity onPress={handleUploadPdf} style={styles.addMediaButton} >
                                                        <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, marginLeft: 0 }}> {'Download Pdf'} </Text>
                                                    </TouchableOpacity>

                                                </>
                                                :
                                                <TouchableOpacity onPress={handleImage} style={styles.addMediaButton} >
                                                    <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, marginLeft: 0 }}> {'Upload Menu'} </Text>
                                                </TouchableOpacity>

                                            }
                                        </>
                                    }
                                </View>} */}
                            </View>
                            {
                                !(profileImage == null) ? handleCarousel() : null
                            }

                            <View style={{ paddingVertical: 0 }}>
                                <IconTitle
                                    textStyle={styles.belowTextStyle}
                                    text={
                                        vendorCategoryName == "Security" ?
                                        guardCertification :
                                            vendorCategoryName == "DJ" ?
                                                // genresVendor.countries.map((item) => {
                                                //     return `${item}, `
                                                // })
                                                null
                                                :
                                                vendorCategoryName == "Catering" ?
                                                    vendor?.cuisines :
                                                    null
                                    }
                                    icon={
                                        vendorCategoryName == "Security" ?
                                            <Certified height={80} width={80} /> :
                                            vendorCategoryName == "DJ" ?
                                                <Certified height={80} width={80} /> :
                                                vendorCategoryName == "Catering" ?
                                                    <Cuisines height={80} width={80} /> :
                                                    <Services height={80} width={80} />
                                    }
                                    iconBelowText={
                                        vendorCategoryName == "Security" ?
                                            "Certified" :
                                            vendorCategoryName == "DJ" ?
                                                "Genres" :
                                                vendorCategoryName == "Catering" ?
                                                    "Cuisines" :
                                                    "Services"
                                    }

                                />
                                <View style={styles.partition} />

                                <IconTitle
                                    textStyle={styles.belowTextStyle}
                                    text={
                                        vendorCategoryName == "Security" ?
                                            vendor?.armed :
                                            vendorCategoryName == "DJ" ?
                                                vendor?.equipment :
                                                vendorCategoryName == "Catering" ?
                                                    vendor?.services :
                                                    vendor?.services
                                    }
                                    icon={
                                        vendorCategoryName == "Security" ?
                                            <Armed height={80} width={80} /> :
                                            vendorCategoryName == "DJ" ?
                                                <Equipments height={80} width={80} /> :
                                                vendorCategoryName == "Catering" ?
                                                    <Services height={80} width={80} /> :
                                                    <Services height={80} width={80} />
                                    }
                                    iconBelowText={
                                        vendorCategoryName == "Security" ?
                                            "Armed" :
                                            vendorCategoryName == "DJ" ?
                                                "Equipment" :
                                                vendorCategoryName == "Catering" ?
                                                    "Services" :
                                                    "Services"
                                    }
                                />
                                <View style={styles.partition} />

                                <IconTitle
                                    textStyle={styles.belowTextStyle}
                                    text={language}
                                    icon={
                                        // language.length !== 0
                                        //     ?
                                        <Multilingual height={80} width={80} />
                                        // : null
                                    }
                                    iconBelowText={"Multilingual"}
                                />
                            </View>
                            {/* <ReviewCard
                            styleProp={{ backgroundColor: '#f0efed' }}

                        /> */}
                        </>
                    }
                </ScrollView>
                <View>
                    <Footer
                        threeItems
                        page={{ current: index + 1, total: arrayLength }}
                        onPressNext={onPressNext}
                        onPressPrevious={onPressPrevious}
                    />
                </View>

            </View>
        </Root>
    )
}
