import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Food, Security, Video, Drinks } from '@assets';
import { FONTSIZE, getHp, getWp } from '@utils'
import { BlackDollar, AddBlue } from '@svg'

const { width } = Dimensions.get("window");
const height = width * 100 / 60;

export default function ImageCarousel(props) {
    const {
        imageArray,
        onSnapToItem,
        state,
        imageBottomLeftText = null,
        imageBottomRightRate = null,
        pagination = false,
        value = false,
        onPress = () => { }
    } = props;
    const renderItem = ({ item, index }) => {

        return (
            <View style={{}}>
                {
                    value === 'Instagram' ?
                        <View style={{}}>
                            <View style={{ flexDirection: 'row',justifyContent:'space-evenly'}}>
                                <Image source={item} style={styles.instaStyles} />
                                <Image source={item} style={styles.instaStyles} />
                                <Image source={item} style={styles.instaStyles} />
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-evenly'}}>
                                <Image source={item} style={styles.instaStyles} />
                                <Image source={item} style={styles.instaStyles} />
                                <Image source={item} style={styles.instaStyles} />
                            </View>
                        </View>
                        :
                        value === 'Friends' ?
                            <View style={{ width: '95%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                    <View style={styles.friendsView}>
                                        <Image source={item} style={styles.friendsImage} />
                                        <Text style={styles.textImage}>{'Eli Rahim'}</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            value == 'Music' ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, paddingVertical: 10, flex: 1 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={item} style={{ borderRadius: 7, width: getWp(180), height: getHp(180), margin: 2 }} />

                                        <Text style={[styles.textImage, { marginVertical: 5, paddingBottom: 0, fontSize: FONTSIZE.Text18 }]}>{'Blue World'}</Text>

                                        <Text style={[styles.textImage, { color: '#696969', paddingBottom: 0, fontSize: FONTSIZE.Text13 }]}>{'Mac Miller'}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', flex: 1 }}>
                                        <Image source={item} style={{ borderRadius: 7, width: getWp(180), height: getHp(180), margin: 2 }} />

                                        <Text style={[styles.textImage, { marginVertical: 5, paddingBottom: 0, fontSize: FONTSIZE.Text18 }]}>{'Blue World'}</Text>

                                        <Text style={[styles.textImage, { color: '#696969', paddingBottom: 0, fontSize: FONTSIZE.Text13 }]}>{'Mac Miller'}</Text>
                                    </View>
                                </View>
                                :
                                value == 'CreateInvitation' ?
                                    <View style={{
                                        alignItems: 'center',
                                        backgroundColor: '#fff'
                                    }}>
                                        <Image source={{
                                            uri: item
                                        }}
                                            style={{ marginLeft: -20, width: '90%', height: 400, }} />
                                    </View>
                                    :
                                    value == 'Normal' ?
                                        <View style={{
                                            alignItems: 'center',
                                            backgroundColor: 'red'
                                        }}>
                                            <Image source={item}
                                                style={{ width: '100%', height: 400, }} />
                                        </View>
                                        :
                                        <View style={{}}>
                                            <TouchableOpacity
                                                onPress={onPress}
                                                style={styles.imageButton} >
                                                <AddBlue height={25} width={25} />
                                            </TouchableOpacity>

                                            <View style={{
                                                alignItems: 'center',
                                                backgroundColor: '#fff'
                                            }}>

                                                <Image
                                                    source={{
                                                        uri: item?.filePath ?
                                                            item.filePath : `${item.itemImage}`
                                                    }}
                                                    style={{ width: '100%', height: 400, }} />
                                                {
                                                    imageBottomLeftText ?
                                                        <View style={[styles.flexDirectionStyle, { width: '100%', backgroundColor: '#DDDDDD', }]}>
                                                            <Text style={[styles.fullInventoryTitleStyle]}>{item.itemName}</Text>
                                                            <View style={[styles.flexDirectionStyle,]}>
                                                                <BlackDollar height={26} width={26} />
                                                                <Text style={[styles.reviewsTitleStyle, { marginLeft: 10, fontSize: FONTSIZE.Text20 }]}>{item.itemCost}</Text>
                                                            </View>
                                                        </View>
                                                        : null
                                                }
                                            </View>
                                        </View>
                }
            </View>
        );
    }

    return (
        <View>
            <Carousel
                data={imageArray}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={onSnapToItem}
            />
            { !pagination ?
                null
                :
                <Pagination
                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', marginVertical: -20 }}

                    dotsLength={imageArray.length}
                    activeDotIndex={state}
                    dotStyle={{

                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: -5,
                        backgroundColor: '#1FAEF7',
                    }}
                    inactiveDotStyle={{
                        backgroundColor: '#696969'
                    }}
                    inactiveDotScale={0.6}
                />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    instaStyles: {
        borderRadius: 4,
        // width: '32%',
        height: getHp(118),
        width: getWp(118),
        margin: 2
    },
    imageButton: {
        borderRadius: 100,
        elevation: 10,
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        zIndex: 100,
        bottom: 20,
        right: 20
    },
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
        fontFamily: 'AvenirNext-Regular',
        color: '#000',
        fontSize: FONTSIZE.Text15,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    fullInventoryTitleStyle: {
        fontFamily: 'AvenirNext-Regular',
        color: '#000',
        fontSize: FONTSIZE.Text17
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 0
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        fontFamily: 'AvenirNext-DemiBold',
        color: '#000',
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