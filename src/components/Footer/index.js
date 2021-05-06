import React, { useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native'
import {
    FooterRight,
    FooterLeft,
    AngleBlueLeft,
    AngleBlueRight,
    Favourited,
    GreyHome,
    WhiteNotifications,
    GreyCalender,
    Message,
    Favourite,
} from '@assets'
import {
    WhiteMessageOutline,
    FavouritedHeart,
    FavouriteHeart,
    LeftBlueArrow,
    RightBlueArrow,
    BlackOutlineHeart,
    BlackShare,
} from '@svg'
import { shareFunction } from '@components'
import { FONTSIZE, getHp, getWp, smallHitSlop } from '@utils';
import { CustomButton } from '@components';

const { height, width } = Dimensions.get('screen')
// const DATA = [
//     {
//         id: "0",
//         icon: <FavouriteHeart height={30} width={30} />,
//         messageName: "Favourite",
//     },
//     {
//         id: "1",
//         icon: <MessageBlack height={30} width={30} />,
//         messageName: "Message",
//     },

// ];
const Item = ({ item, onPress, style, selectedId }) => (
    <TouchableOpacity onPress={onPress} style={[styles.footerList,
    style.backgroundColor ? styles.selectedFooterItem
        : null
    ]} >
        {
            style.backgroundColor ?
                <FavouritedHeart height={30} width={30} />
                :
                item.icon
        }
        <Text style={styles.reviewsTitleStyle}>{item.messageName}</Text>
    </TouchableOpacity>
);

export default function Footer(props) {

    const {
        buttonStack = [],
        disable = false,
        text,
        backgroundColor,
        notification = false,
        CompleteButton,
        onPress,
        threeItems,
        page = false,
        onPressPrevious = () => { },
        onPressNext = () => { }
    } = props
    // console.log("FOOTER CONSOLE::",page);
    const FooterRef = useRef(null)
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const [favourite, setFavourite] = useState(0)
    const [shared, setShared] = useState(0)
    // const [favourite,setFavourite]=useState(0)

    const renderItem = ({ item, index }) => {
        if (selectedId == 0) {
            var backgroundColor = item.id === selectedId ? "#FF2E00" : null;
        }
        else if (item.id === selectedId) {
            shareFunction()
            setSelectedId(null)
        }

        return (
            <Item
                key={index}
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
                selectedId
            />
        );
    };
    // const onPressPrevious = () => {
    //     FooterRef.current.scrollToIndex({ animated: true, index: getIndex == 0 ? 0 : getIndex - 1 });
    //     { getIndex != 0 ? setIndex(getIndex - 1) : null }

    // };
    // const onPressNext = () => {
    //     FooterRef.current.scrollToIndex({ animated: true, index: getIndex == buttonStack.length - 1 ? buttonStack.length - 1 : getIndex + 1 });
    //     { getIndex != buttonStack.length - 1 ? setIndex(getIndex + 1) : null }
    // };

    return (
        <View>
            { notification ?
                (<View style={styles.container}
                //  pointerEvents={disable ? "none" : null}
                >
                    <TouchableOpacity onPress={() => onPressPrevious()} style={styles.circle}>
                        <LeftBlueArrow height={20} width={20} />
                    </TouchableOpacity>

                    {/* <ScrollView> */}
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        horizontal
                        ref={FooterRef}
                        initialScrollIndex={0}

                    />
                    {/* </ScrollView> */}
                    <TouchableOpacity ref={FooterRef} onPress={() => onPressNext()} style={styles.circle}>
                        <RightBlueArrow height={20} width={20} />
                    </TouchableOpacity>
                </View>)
                :
                // <View style={styles.container}>
                //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20, }}>
                //         <Image source={GreyHome} />
                //         <Image source={GreyCalender} />
                //         <Image source={WhiteNotifications} />
                //         <Image source={GreyHome} />
                //     </View>
                // </View>
                null
            }
            {
                CompleteButton ?
                    <View style={{ marginTop: 50, borderTopWidth: 0.5, borderTopColor: '#CCCCCC', width: '100%', backgroundColor: '#fff', paddingVertical: 10 }}>
                        <CustomButton
                            Pay
                            onPress={onPress}
                            ButtonTitle={text}
                            ContainerStyle={{ backgroundColor: '#000000', width: '90%', alignSelf: 'center' }}
                            ButtonStyle={{ backgroundColor: '#1FAEF7', borderRadius: 20, }}
                            TitleStyle={[styles.TitleStyle, { fontSize: FONTSIZE.Text21, letterSpacing: 1.5 }]}
                        />
                        <View style={{ backgroundColor: '#000000', height: 5, width: '45%', borderRadius: 40, marginTop: 15, alignSelf: 'center' }} />
                    </View>

                    : null

            }
            { threeItems ?
                (<View style={styles.container} >
                    <View style={styles.oneFooter}>
                        <TouchableOpacity ref={FooterRef} onPress={() => onPressPrevious()}>
                            <LeftBlueArrow height={20} width={20} />
                        </TouchableOpacity>
                        {
                            page ?
                                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: FONTSIZE.Text16 }}>
                                    {page.current} /
            <Text style={{ color: '#000', fontSize: FONTSIZE.Text16, fontWeight: 'normal' }}>
                                        {` ${page.total}`}
                                    </Text>
                                </Text>
                                : null
                        }
                        <TouchableOpacity ref={FooterRef} onPress={() => onPressNext()} hitSlop={smallHitSlop}>
                            <RightBlueArrow height={20} width={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#999999', justifyContent: 'space-around' }}>
                        {console.log("THIS IS FAVOURITE", favourite)}
                        <TouchableOpacity
                            onPress={() => setFavourite(favourite + 1)}
                            style={[styles.footerList]}
                        >
                            {
                                <BlackOutlineHeart height={21} width={21} />
                            }
                            <Text style={styles.reviewsTitleStyle}>
                                {`Favourite`}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onPress} style={[styles.footerList,
                            ]} >
                            {
                                <WhiteMessageOutline height={21} width={21} />
                            }
                            <Text style={styles.reviewsTitleStyle}>{"Message"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShared(shared + 1)}
                            style={[styles.footerList,]} >
                            {
                                <BlackShare height={21} width={21} />
                            }
                            <Text style={styles.reviewsTitleStyle}>{`Share`}</Text>
                        </TouchableOpacity>

                    </View>
                </View>)
                :

                null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    oneFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
    , TitleStyle: {
        fontSize: 16,
        paddingVertical: 5
    },
    circle: {
        marginHorizontal: 5,
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#272727'
        backgroundColor: '#fff',
        elevation: 4

    },
    container: {
        // borderTopWidth:0.5,
        // flex:1,
        borderTopColor: '#696969',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingVertical: 0,
        elevation: 10,
        // width:'100%'
    },
    reviewsTitleStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text12,
        marginVertical: 2
    },
    footerList: {
        // height: 80,
        // width: width / 3, //100
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        // borderColor:'#fff',
        paddingVertical: 15,
        height: getHp(70),
        width: getWp(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        elevation: 5,


    },
    selectedFooterItem: {
        backgroundColor: "rgba(255, 46, 0, 0.24)",
    }
})