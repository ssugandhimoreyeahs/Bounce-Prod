import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native';
import {
    Header,
    ImageCarousel,
    IconTitle,
    Scaffold,
    ReviewCard,
    CustomText,
    Footer
} from '@components'
import { styles as PageStyle } from './indexCss';
import Back from 'react-native-vector-icons/Ionicons';
import {
    AddBlue,
    DollarOnlyWhite,
    Certified,
    Armed,
    Multilingual,
    Services,
    Cuisines,
    Equipments,
    Webpin,
} from '@svg'
import Ratings from '../../../components/RatingStar/Ratings'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '@utils'
import { connect, useSelector, useDispatch } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { observer } from 'mobx-react';
import { Searchbar } from 'react-native-paper';
import MobxStore from '../../../mobx';




function VendorProfile(props) {
    let loader = false;
    const {
        uiStore,
    } = MobxStore;
    let styles = PageStyle(uiStore.theme);
    console.log("PROPS ON VENDOR PROFILE :", props);
    const dispatch = useDispatch()
    const { item, index = {} } = props?.item || props?.route?.params
    const { arrayLength, onPressPrevious, onPressNext } = props
    console.log("INSIDE ITEM", item);

    const { width } = Dimensions.get("window");

    const {
        isFavourite,
        id,
        fullName,
        city,
        about,
        gallery,
        vendorCategoryName,
        language,
        username,
        numberOfRatings,
        profileImage,
        vendor = {},
    } = item;
    console.log("THIS IS VENDOR ID -->", id)
    const {
        equipment,
        cuisines,
        services,
        armed,
        website,
        genres = {},
        guardCertification,
        hourlyRate,
        inventory,
    } = vendor

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [getState, setState] = useState(0)
    const [getMedia, setMedia] = useState(null)

    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={getMedia == null ? [] : getMedia}
            onSnapToItem={(index) => setState(index)}
            state={getState}
        />
    } 
    return (
        // <Scaffold
        //     statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <View style={[styles.container, {
                width: Dimensions.get('window').width,
                // height:Dimensions.get('window').height,
            }]} >
                <Spinner visible={loader} color={'#1FAEF7'} />
                {!loader && (
                    <ScrollView style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>

                            <View style={{
                                flexDirection: 'row', height: 50,
                                borderBottomWidth: 2,
                                borderColor: '#F2F5F6',
                                backgroundColor: '#fff',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => props.navigation.goBack()}>
                                    <Back name="chevron-back" color={'#000'} style={{ marginRight: 20, marginLeft: 10 }} size={30} />
                                </TouchableOpacity>

                                <Searchbar
                                    placeholder={"Search events"}
                                    onChangeText={onChangeSearch}
                                    value={searchQuery}
                                    inputStyle={{
                                        fontSize: FONTSIZE.Text14,
                                        fontFamily: 'AvenirNext-Regular',
                                    }}
                                    style={styles.searchBarStyle}
                                    iconColor={"#999999"}
                                    placeholderTextColor={"#909090"}
                                />
                            </View>


                            <View style={styles.subContainer}>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 5,
                                        }}>
                                        {profileImage != null ? (
                                            <Avatar
                                                source={{ uri: `${profileImage.filePath}` }}
                                                size={getHp(60)}
                                                rounded
                                            />
                                        ) : null}

                                        <View
                                            style={{
                                                paddingLeft: 15,
                                                minWidth: '55%',
                                                maxWidth: '65%',
                                            }}>


                                            {fullName !== null ? (
                                                <Text style={[styles.fullName, { marginBottom: 4 }]}>
                                                    {fullName}
                                                </Text>
                                            ) : null}


                                            {city !== null ? (
                                                <Text
                                                    style={[
                                                        styles.fullName,
                                                        {
                                                            opacity: 0.7,
                                                            fontFamily: 'AvenirNext-Regular',
                                                            color: uiStore.theme.colors.primaryText1,
                                                            fontSize: FONTSIZE.Text14,
                                                            marginTop: 4,
                                                        },
                                                    ]}>
                                                    {city}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                                        <Ratings rating={'N/A'} />

                                        {hourlyRate != null &&
                                            vendorCategoryName !== 'Event Rentals' ? (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingLeft: 15,
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor: '#00E08F',
                                                            borderRadius: 5,
                                                            padding: 2,
                                                        }}>
                                                        <DollarOnlyWhite height={18} width={18} />
                                                    </View>
                                                    {vendorCategoryName == 'DJ' ? (
                                                        <>
                                                            <Text style={styles.hourStyle}>
                                                                {hourlyRate} / hour
                              </Text>

                                                            <Text
                                                                style={[
                                                                    styles.hourStyle,
                                                                    { color: '#696969', fontSize: FONTSIZE.Text14 },
                                                                ]}>
                                                                {' '}
                                (Base Package)
                              </Text>
                                                        </>
                                                    ) : vendorCategoryName == 'Catering' ? (
                                                        <>
                                                            <Text style={styles.hourStyle}>
                                                                {hourlyRate} / guest
                              </Text>

                                                            <Text
                                                                style={[
                                                                    styles.hourStyle,
                                                                    { color: '#696969', fontSize: FONTSIZE.Text14 },
                                                                ]}>
                                                                {' '}
                                                                {"(Base Package)"}
                                                            </Text>
                                                        </>
                                                    ) : (
                                                                <Text style={styles.hourStyle}>
                                                                    {hourlyRate} / hour
                                                                </Text>
                                                            )}
                                                </View>
                                            ) : null}
                                    </View>

                                    {website != null ? (
                                        <View style={styles.websiteView}>
                                            <Webpin height={getHp(21)} width={getWp(23)} />
                                            <Text
                                                onPress={() => Linking.openURL(`https://${website}`)}
                                                style={styles.webText}>
                                                {website}
                                            </Text>
                                        </View>
                                    ) : null}

                                    <View
                                        style={[styles.partition, { marginTop: 30, marginBottom: 0 }]}
                                    />

                                    {about != null ? (
                                        <CustomText
                                            TextData={about}
                                            styleProp={{
                                                color: '#000',
                                                fontFamily: 'AvenirNext-Medium',
                                                fontSize: FONTSIZE.Text14,
                                                marginTop: getHp(10),
                                            }}
                                        />
                                    ) : null}

                                    <View style={[styles.partition, { marginBottom: 20 }]} />
                                </View>


                                {/* View Inventory Add Media Extra button START */}


                                {/* View Inventory Add Media Extra button FINISH */}

                                {!(
                                    gallery == null ||
                                    gallery.length == 0
                                ) && vendorCategoryName != 'Event Rentals' ? (
                                        <>
                                            <View style={styles.prView}>
                                                <Text
                                                    style={[
                                                        styles.mediaText,
                                                        {
                                                            fontSize: FONTSIZE.Text16,
                                                            fontFamily: 'AvenirNext-Medium',
                                                            color: '#000',
                                                            marginBottom: getHp(10)
                                                        },
                                                    ]}>
                                                    {'Media'}
                                                </Text>
                                                {/* <TouchableOpacity onPress={handleImage} >
                          <View style={styles.onlyFlex}>
                            <AddBlueWhite height={20} width={20} />
                            <Text style={[styles.addButton, { marginLeft: 10 }]}>{"Add"}</Text>
                          </View>
                        </TouchableOpacity> */}
                                            </View>
                                            {!(
                                                gallery == null ||
                                                gallery.length == 0
                                            ) && vendorCategoryName != 'Event Rentals'
                                                ? handleCarousel()
                                                : null}
                                        </>
                                    ) : (
                                        <View>
                                            {(gallery == null ||
                                                gallery.length == 0) &&
                                                vendorCategoryName != 'Event Rentals' ? (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            // console.log('TEST - ', uiStore.theme.serialize());
                                                            // return;
                                                            handleImage();
                                                        }}
                                                        style={styles.addMediaButton}>
                                                        <View style={styles.onlyFlex}>
                                                            <AddBlue height={20} width={20} />
                                                            <Text
                                                                style={[
                                                                    styles.mediaText,
                                                                    { fontWeight: 'bold', marginVertical: 10 },
                                                                ]}>
                                                                {' '}
                                                                {'Add Media'}{' '}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ) : null}
                                        </View>
                                    )}
                                {/* {
                    !(gallery == null) ? handleCarousel() : null
                  } */}

                                {/* pdf section */}
                                {/* {
                                    <>
                                        {(vendorCategoryName == 'Bartenders' ||
                                            vendorCategoryName == 'Catering' ||
                                            vendorCategoryName == 'Event Rentals') &&
                                            // (getPdf != null || getPdf.length != 0) ||
                                            menu != null ? (
                                                <>
                                                    <TouchableOpacity
                                                        onPress={handleUploadPdf}
                                                        style={[styles.addMediaButton]}>
                                                        <Text
                                                            style={[
                                                                styles.mediaText,
                                                                {
                                                                    color: '#1FAEF7',
                                                                    fontSize: FONTSIZE.Text20,
                                                                    fontWeight: 'bold',
                                                                },
                                                            ]}>
                                                            {vendorCategoryName == 'Event Rentals'
                                                                ? 'View All Inventory'
                                                                : 'View Menu'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (vendorCategoryName == 'Bartenders' ||
                                                vendorCategoryName == 'Catering' ||
                                                vendorCategoryName == 'Event Rentals') &&
                                                // (getPdf != null || getPdf.length != 0) ||
                                                menu == null ? (
                                                    <TouchableOpacity
                                                        onPress={handleImage}
                                                        style={[styles.addMediaButton]}>
                                                        <Text
                                                            style={[
                                                                styles.mediaText,
                                                                {
                                                                    color: '#1FAEF7',
                                                                    fontSize: FONTSIZE.Text20,
                                                                    fontWeight: 'bold',
                                                                },
                                                            ]}>
                                                            {vendorCategoryName == 'Event Rentals'
                                                                ? 'Upload Inventory'
                                                                : 'Upload Menu'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ) : null}
                                    </>
                                } */}
                            </View>

                            <View style={{ paddingVertical: 0 }}>
                                <IconTitle
                                    textStyle={styles.belowTextStyle}
                                    text={
                                        vendorCategoryName == 'Security' ? (
                                            <>
                                                {guardCertification.map((item, i) => {
                                                    let comma =
                                                        guardCertification.length - 1 > i ? ', ' : '';
                                                    return item.label + comma;
                                                })}
                                            </>
                                        ) : vendorCategoryName == 'DJ' ? (
                                            <>
                                                {genres.map(item => {
                                                    return `${item.label}, `;
                                                })}
                                            </>
                                        ) : vendorCategoryName == 'Catering' ? (
                                            cuisines
                                        ) : null
                                    }
                                    icon={
                                        vendorCategoryName == 'Security' ? (
                                            <Certified height={60} width={60} />
                                        ) : vendorCategoryName == 'DJ' ? (
                                            <Certified height={60} width={60} />
                                        ) : vendorCategoryName == 'Catering' ? (
                                            <Cuisines height={60} width={60} />
                                        ) : (
                                                        <Services height={60} width={60} />
                                                    )
                                    }
                                    iconBelowText={
                                        vendorCategoryName == 'Security'
                                            ? 'Certified'
                                            : vendorCategoryName == 'DJ'
                                                ? 'Genres'
                                                : vendorCategoryName == 'Catering'
                                                    ? 'Cuisines'
                                                    : 'Services'
                                    }
                                />

                                <IconTitle
                                    textStyle={styles.belowTextStyle}
                                    text={
                                        vendorCategoryName == 'Security'
                                            ? armed
                                            : vendorCategoryName == 'DJ'
                                                ? equipment
                                                : vendorCategoryName == 'Catering'
                                                    ? services
                                                    : services
                                    }
                                    icon={
                                        vendorCategoryName == 'Security' ? (
                                            <Armed height={50} width={50} />
                                        ) : vendorCategoryName == 'DJ' ? (
                                            <Equipments height={60} width={60} />
                                        ) : vendorCategoryName == 'Catering' ? (
                                            <Services height={48} width={48} />
                                        ) : (
                                                        <Services height={48} width={48} />
                                                    )
                                    }
                                    iconBelowText={
                                        vendorCategoryName == 'Security'
                                            ? 'Armed'
                                            : vendorCategoryName == 'DJ'
                                                ? 'Equipment'
                                                : vendorCategoryName == 'Catering'
                                                    ? 'Services'
                                                    : 'Services'
                                    }
                                />
                                {language == null ||
                                    (language?.length == 1 &&
                                        language[0].label === 'English') ? null : (
                                        <IconTitle
                                            textStyle={styles.belowTextStyle}
                                            text={
                                                language != null ? (
                                                    <>
                                                        {language.map((item, i) => {
                                                            let comma = language.length - 1 > i ? ', ' : '';
                                                            return item.label + comma;
                                                        })}
                                                    </>
                                                ) : null
                                            }
                                            icon={<Multilingual height={42} width={42} />}
                                            iconBelowText={'Multilingual'}
                                        />
                                    )}
                            </View>

                            <ReviewCard />
                        </View>
                    </ScrollView>

                )}
                <Footer
                    isFavourite={isFavourite}
                    id={id}
                    threeItems
                    page={{ current: index + 1, total: arrayLength }}
                    onPressNext={onPressNext}
                    onPressPrevious={onPressPrevious}
                />
            </View>
        // </Scaffold>
    );
}
VendorProfile.routeName = "/VendorProfile";
export default observer(VendorProfile)

