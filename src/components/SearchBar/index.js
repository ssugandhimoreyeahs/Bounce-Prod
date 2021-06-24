import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { Avatar } from 'react-native-elements'
import { CustomButton, TextIconButton } from '@components'
import {
    RequestSent,
    SendRequest,
    CohostPurple,
    GreenTick,
    BlackArrowDown,
    CohostWhite,
} from '@svg'
import { FONTSIZE, getHp, getWp } from '@utils'
import LinearGradient from 'react-native-linear-gradient';


export default function SearchBar(props) {
    const {
        dataList = [],
        placeholder = null,
        parentState,
        filterSmallButtons = false,
        mutual = false,
        noSearchbar = false,
        heading,
        rightIcon = false,
        requestIcon = false,
        noUnderline = false,
        cohost = false
    } = props
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [selectedId, setSelectedId] = useState(null);
    const [getIndex, setIndex] = useState(0)
    const FooterRef = useRef(null)
    const [more, setMore] = useState({ length: null, hide: true })

    const RenderItem = ({ item, index }) => {
        // console.log(index)
        return (
            <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                    <TouchableOpacity onPress={parentState} style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <View style={{
                            flex: 1, flexDirection: 'row', alignItems: 'center',
                        }}>
                            <Avatar
                                source={item.icon}
                                size={getHp(40)}
                                rounded
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: FONTSIZE.Text16,
                                    fontFamily: 'AvenirNext-Medium'
                                }}>{"Porter Robinson"}</Text>
                                {
                                    mutual ?
                                        <Text style={{ color: '#999999', fontSize: FONTSIZE.Text12, letterSpacing: 0.2 }}>{"18 Mutual Friends"}</Text>
                                        : null
                                }
                            </View>
                        </View>

                        <CohostPurple height={24} width={30} />

                    </TouchableOpacity>


                    {requestIcon &&
                        <View>
                            {heading == 'Contacts'
                                ?
                                <TouchableOpacity style={[styles.fourItems, { backgroundColor: 'rgba(0, 224, 143, 0.2)', borderRadius: 67, padding: 5 }]}>
                                    <GreenTick height={11} width={16} />
                                </TouchableOpacity>

                                :
                                <TouchableOpacity style={[styles.fourItems, { backgroundColor: 'rgba(0, 224, 143, 0.2)', borderRadius: 67, padding: 10 }]}>
                                    <GreenTick height={18} width={18} />
                                </TouchableOpacity>
                                // <RequestSent height={45} width={50} />
                            }
                        </View>
                    }

                </View>

                {!noUnderline &&
                    <>
                        {dataList.length - 1 == index ?
                            null
                            :
                            < View style={{ borderBottomWidth: 0.2, backgroundColor: '#EEEEEE' }} />
                        }
                    </>

                }

            </View>
        )
    }

    const renderSmallButton = ({ item, index }) => {
        console.log("item", item);
        return (
            <TouchableOpacity onPress={parentState} style={{ flexDirection: 'row', backgroundColor: '#fff', flex: 1, alignItems: 'center', marginVertical: 15 }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#5EC7FC', '#90DAFF']}
                    style={[styles.linearGradient, { marginRight: 5, paddingHorizontal: 10, paddingVertical: 5 }]}>
                    <Text style={styles.allTitleStyle}>{item}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (<View style={{ backgroundColor: '#FBFBFB', paddingHorizontal: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' }}>
            <Text style={styles.reviewsTitleStyle}>
                {heading}
            </Text>



            {cohost ?
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FF7557', '#FF9C86']}
                    style={[styles.linearGradient]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, }}>
                        <CohostWhite height={25} width={25} />
                        <Text style={[styles.reviewsTitleStyle, { fontSize: FONTSIZE.Text16, color: '#fff', fontWeight: 'normal' }]}>
                            {" Add Cohost"}
                        </Text>
                        {
                            false ? <Info height={30} width={30} style={{ marginLeft: 20 }} />
                                : null
                        }
                    </TouchableOpacity>
                </LinearGradient>
                : null
            }


            {
                filterSmallButtons ?
                    <FlatList
                        data={filterSmallButtons}
                        renderItem={renderSmallButton}
                        keyExtractor={(index) => index}
                        horizontal
                    />
                    : null
            }

        </View>



        {!noSearchbar &&

            <Searchbar
                placeholder={placeholder}
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{ fontSize: FONTSIZE.Text18 }}
                style={{
                    height: getHp(50),
                    elevation: 1,
                    borderRadius: 9,
                    backgroundColor: '#fff',
                    marginVertical: 15,
                    fontFamily: 'AvenirNext-Regular'
                }}
                iconColor={"#999999"}
                placeholderTextColor={"#909090"}
            />
        }


        {dataList.length > 4 && more.hide && (heading == 'Contacts' || heading == 'Friends') ?
            <>
                { dataList.map((item, index) => {
                    if (index < 4) {
                        return <RenderItem item={item} index={index + 5} />
                    }
                })}
                <TextIconButton
                    onPress={() => setMore({ hide: !(more.hide) })}
                    title={`${dataList.length - 4} More `}
                    icon={<BlackArrowDown height={10} width={10} />}
                    containerProp={{ backgroundColor: '#EEEEEE' }}
                    textStyleProp={{ color: '#000' }}
                />
            </>
            :
            dataList.map((item, index) => {
                return <RenderItem item={item} index={index} />

            })
        }
    </View>
    );
}
const styles = StyleSheet.create({
    greenTick: {

    },
    linearGradient: {
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    fourItems: {
        backgroundColor: '#000000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text24,
        fontWeight: 'bold'
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
    },
    allContainerStyle: {
        // alignSelf: 'center',
        width: '100%',
        paddingRight: 5
    },
    allButtonStyle: {
        // width: '10%',
        // borderRadius: 24,
        // backgroundColor: '#1FAEF7',
        // paddingHorizontal: 20,
        // paddingVertical: 5
    },
    allTitleStyle: {
        fontSize: FONTSIZE.Text14,
        fontFamily: 'AvenirNext-DemiBold',
        color: '#fff',
        letterSpacing: 0.5
    },
})