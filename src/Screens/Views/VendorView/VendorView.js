import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Header, ImageCarousel, IconTitle, ReviewCard, Footer, CustomText } from '@components'
import {
    Message,
    Favourite,
} from '@assets'
import { styles } from './indexCss';
import {
    AddBlueWhite,
    BlackOutlineShare,
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
import { fetchGet, postData } from '../../../FetchServices'
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

export default function DjProfile(props) {
    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)
    const [loader, setLoader] = useState(false);
    const [selector, setSelector] = useState(null)
    const [getPdf, setPdf] = useState(null)
    const dispatch = useDispatch()
    const [parsedGenreData, setParsedGenreData] = useState()
    const { body, previousScreen = {} } = props.route.params
    // console.log("PROPS", props);
    // console.log("previousScreen", previousScreen)

    const {
        token = {},
        user = {}
    } = useSelector((state) => state.mainExpenseByCategory.vendorProfileData);
    const { about, fullName, city, language, username, vendor = {}, vendorCategoryName = {}, profileImage } = user
    const { equipment,
        cuisines,
        services,
        armed,
        website,
        genres = {},
        guardCertification,
        hourlyRate } = vendor

    // parsedGenreData = JSON.parse(genres)
    useEffect(() => {
        fetchProfile()
    }, [])
    // console.log("vendorCategoryName",vendorCategoryName);
    const fetchProfile = async () => {
        setLoader(true)
        // let token = "Bearer " + AccessToken
        console.log("body", body);
        let SERVER_RESPONSE = await ApiClient.instance.post(ApiClient.endPoints.postLogin, body)
        console.log("NORMAL RES", SERVER_RESPONSE);
        console.log("SERVER_RESPONSE", JSON.stringify(SERVER_RESPONSE));
        if (!(SERVER_RESPONSE.statusCode == 401)) {
            dispatch(fetchVendorData(["VENDOR_PROFILE_DATA", SERVER_RESPONSE]))
            setLoader(false)
        }
        setLoader(false)
    }

    const handleCarousel = () => {
        return <ImageCarousel
            pagination
            imageArray={getMedia == null ? [] : getMedia}
            onSnapToItem={(index) => setState(index)}
            state={getState}
        />
    }
    let tempArray = []

    const handleImagesArray = async (images) => {
        // console.log('IMAGES ARRAY SELECTED', images);
        let milliseconds = new Date().getTime();
        images.map((item) => {
            // console.log("item", item);
            tempArray.push({
                uri: `${item.path}`,
                type: "image/jpeg",
                name: `image-${milliseconds}.jpg`,
            })
        })


        let formData = new FormData()
        formData.append('galleryFiles', tempArray)

        let config = {
            headers: {
                'Authorization': 'Bearer' + `${token}`
            }
        }
        const RES_IMAGE = await axios.post('http://3.12.168.164:3000/vendor/addmedia', formData, config);
        // console.log("RES_IMAGE", RES_IMAGE);
        let StringifyData = await JSON.stringify(RES_IMAGE.data)
        // console.log("RES_IMAGE_parsedData", JSON.parse(StringifyData))

        setMedia(
            images.map(i => {
                return i.path
            })
        );
    }

    const handleImage = async () => {
        {
            vendorCategoryName !== 'Bartenders' &&
                vendorCategoryName !== 'Catering' &&
                vendorCategoryName !== 'Event Rentals' ?

                ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    multiple: true
                }).then(images => {
                    handleImagesArray(images)

                })
                :
                pickDocument().then((res) => {
                    console.log("RESPONSE PDF", res);
                    let milliseconds = new Date().getTime();
                    let formData = new FormData()
                    let imgObj = {
                        uri: `${res.fileCopyUri}`,
                        type: "application/pdf",
                        name: `pdf-${milliseconds}.pdf`,
                    }
                    console.log("TOKEN", token);
                    let config = {
                        headers: {
                            'Authorization': 'bearer' + `${token}`
                        }
                    }
                    formData.append('menu', imgObj)
                    axios.post('http://3.12.168.164:3000/menu/addmenu', formData, config)
                        .then((SERVER_PDF) => {
                            console.log("SERVER_PDF", SERVER_PDF);
                            setPdf(SERVER_PDF)
                        })

                    // if (res.length !== 0) {
                    setPdf(res)
                    // }
                })
        }
    }

    const handleUploadPdf = async () => {
        console.log("GETPDF", getPdf);
        var formData = new FormData()
        let body = {
            'pdf': getPdf.uri
        }
        let tokenLocal = "Bearer " + token
        let config = {
            headers: {
                'Authorization': tokenLocal
            }
        }
        formData.append('pdf', getPdf.uri)
        var PDF_RESPONSE = await axios.post('http://3.12.168.164:3000/menu/addmenu', formData, config)
        console.log("PDF_RESPONSE", PDF_RESPONSE);
    }

    let FinalGenres = []
    let FinalLanguage = []
    let FinalGuard = []

    const dataParser = (data) => {
        let temp = JSON.parse(data)
        temp.map((item) => {
            FinalGenres.push(item.genres)
            console.log("asdjfbkasbfc", item.genres);
        })
    }
    const LangDataParser = (data) => {
        let temp = JSON.parse(data)
        temp.map((item) => {
            FinalLanguage.push(item.name)
            console.log("FinalLanguage", item.name);
        })
    }

    const GuardDataParser = (data) => {
        let temp = JSON.parse(data)
        temp.map((item) => {
            FinalGuard.push(item.certification)
            console.log("FinalGuard", item.certification);
        })
    }

    return (
        <View style={styles.container} >
            <ScrollView>
                <Spinner visible={loader} color={'#1FAEF7'} />
                {!loader &&
                    <>
                        <View pointerEvents="none">
                            <Header

                                // headerTitle={"DJ Nathan"}
                                share={<BlackOutlineShare height={25} width={25} />}
                                back
                                onPress={() => props.navigation.goBack()}
                                headerBackColor={{ backgroundColor: '#fff' }}
                            />
                        </View>
                        <View style={styles.subContainer} pointerEvents="none">
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
                                        <Text style={[styles.fullName]}>{fullName}</Text>
                                        : null
                                    }
                                    {city !== null ?
                                        <Text style={[styles.fullName, { color: '#696969', fontSize: FONTSIZE.Text14, }]}>{city}</Text>
                                        : null
                                    }


                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                                <Ratings
                                    rating={0}
                                />

                                {hourlyRate != null &&
                                    vendorCategoryName !== "Party Rental" ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                                        <View style={{ backgroundColor: '#00E08F', borderRadius: 5, padding: 2 }}>
                                            <DollarOnlyWhite height={20} width={20} />
                                        </View>
                                        {
                                            vendorCategoryName == "DJ"

                                                ?
                                                <>
                                                    <Text style={styles.hourStyle}>{hourlyRate} / hour</Text>

                                                    <Text style={[styles.hourStyle, { color: '#696969', fontSize: FONTSIZE.Text14 }]}> (Base Package)</Text>
                                                </>
                                                :

                                                vendorCategoryName == "Catering" ?
                                                    <>
                                                        <Text style={styles.hourStyle}>{hourlyRate} / guest</Text>

                                                        <Text style={[styles.hourStyle, { color: '#696969', fontSize: FONTSIZE.Text14 }]}> (Base Package)</Text>
                                                    </>
                                                    :
                                                    <Text style={styles.hourStyle}>{hourlyRate} / hour</Text>
                                        }
                                    </View>
                                    : null
                                }
                            </View>

                            {about != null ? <CustomText
                                TextData={about}
                                styleProp={{ color: '#000' }}
                            /> : null}

                            {website != null ?
                                <View style={styles.websiteView}>
                                    <WebsiteBlack height={24} width={24} />
                                    <Text onPress={() => Linking.openURL(`https://${website}`)} style={styles.webText}>{website}</Text>
                                </View>
                                : null
                            }


                            {!(getMedia == null) ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000', fontSize: FONTSIZE.Text24, marginLeft: 0, fontFamily: 'AvenirNext-Regular', }}>Media</Text>
                                    <TouchableOpacity onPress={handleImage} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', fontFamily: 'AvenirNext-Regular', }}>
                                            <AddBlueWhite height={20} width={20} />
                                            <Text style={{ color: '#000', fontSize: FONTSIZE.Text20, marginLeft: 10, fontFamily: 'AvenirNext-Regular', }}>Add</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View pointerEvents="none">
                                    {vendorCategoryName !== 'Bartenders' &&
                                        vendorCategoryName !== 'Catering' &&
                                        vendorCategoryName !== 'Event Rentals' ?
                                        <TouchableOpacity onPress={handleImage} style={styles.addMediaButton} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <AddBlueWhite height={20} width={20} />
                                                <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, marginLeft: 10, fontFamily: 'AvenirNext-Regular', }}> {'Add Media'} </Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <>
                                            {getPdf != null ?
                                                <>
                                                    <TouchableOpacity onPress={handleUploadPdf} style={styles.addMediaButton} >
                                                        <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, fontFamily: 'AvenirNext-Regular', }}> {'View Menu'} </Text>
                                                    </TouchableOpacity>

                                                </>
                                                :
                                                <TouchableOpacity onPress={handleImage} style={styles.addMediaButton} >
                                                    <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text20, fontFamily: 'AvenirNext-Regular' }}> {'Upload Menu'} </Text>
                                                </TouchableOpacity>

                                            }
                                        </>
                                    }
                                </View>}
                        </View>
                        {
                            !(getMedia == null) ? handleCarousel() : null
                        }

                        <View style={{ paddingVertical: 0 }}>
                            {/* 1st */}
                            <IconTitle
                                textStyle={styles.belowTextStyle}
                                text={
                                    vendorCategoryName == "Security" ?

                                        <>
                                            {
                                                GuardDataParser(guardCertification)
                                            }
                                            {FinalGuard.map((item) => {
                                                return `${item}, `
                                            })}

                                        </>
                                        :
                                        vendorCategoryName == "DJ" ?
                                            <>
                                                {
                                                    dataParser(genres)
                                                }
                                                {FinalGenres.map((item) => {
                                                    return `${item}, `
                                                })}

                                            </>
                                            :
                                            vendorCategoryName == "Catering" ?
                                                cuisines :
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
                            {/* 2nd */}
                            <IconTitle
                                textStyle={styles.belowTextStyle}
                                text={
                                    vendorCategoryName == "Security" ?
                                        armed :
                                        vendorCategoryName == "DJ" ?
                                            equipment :
                                            vendorCategoryName == "Catering" ?
                                                services :
                                                services
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

                            {/* 3rd */}
                            <IconTitle
                                textStyle={styles.belowTextStyle}
                                text={
                                    language != null ?
                                        <>
                                            {LangDataParser(language)}
                                            {FinalLanguage.map((item) => {
                                                return `${item}, `
                                            })}
                                        </>
                                        : null

                                }

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
            {/* <Footer buttonStack={DATA} /> */}
            <View pointerEvents="none">
                <Footer
                    threeItems
                    page={{ current: 1, total: 1 }}
                    onPressNext={() => console.log()}
                    onPressPrevious={() => console.log()}
                />
            </View>
        </View>
    )
}
