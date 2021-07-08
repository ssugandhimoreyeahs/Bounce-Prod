import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { QRCodes, Scaffold, SearchPageTab, Toast } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { ChangeBlue } from '@svg'
import Back from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'rn-range-slider';
import Thumb from './basic/Thumb'
import Rail from './basic/Rail'
import RailSelected from './basic/RailSelected'
import Label from './basic/Label'
import Notch from './basic/Notch'
import { ApiClient } from '../../../app/services';
import MobxStore from '../../../mobx';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { RegexCollection } from '@constants';

export default function EventsTab(props) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [loader, setLoader] = useState(false);
    const [thisWeek, setThisWeek] = useState(false)
    const [filteredEvents, setFilteredEvents] = useState(false)

    //Slider states
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        // setLow(low);
        // setHigh(high);
    }, []);
    //Slider states END

    const setTheStates = (SWITCH) => {
        switch (SWITCH) {
            case 'Today':
                console.log("Today case");
                return;
            case 'Tomorrow':
                console.log("Tomorrow case");
                return;
            case 'This week':
                console.log("This week case");
                setThisWeek(!thisWeek)
                return;
            case '18+':
                console.log("18+ case");
                return;
            case '21+':
                console.log("21+ case");
                return;

        }
    }
    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={() => setTheStates(item)}
                style={styles.tagsStyle}>
                <Text style={[styles.textStyle, {
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text16
                }]}> {item}</Text>
            </TouchableOpacity>
        )
    }
    const renderEvents = ({ item, index }) => {
        // setLoader(true)
        console.log("RENDER ITEM-->",JSON.stringify(item))
        return (
            <TouchableOpacity
                style={styles.shadowStyle}
                // onPress={() =>
                //   props.navigation.navigate(CreateInvitation.routeName, {
                //     party: item,
                //     isEditParty: true,
                //   })
                // }
                key={index}
                style={{ backgroundColor: '#F5F5F5', padding: 10 }}>
                {/* This can be used as component */}
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                    <Avatar
                        source={{ uri: item?.gallery[0]?.filePath }}
                        size={125}
                        avatarStyle={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                    />

                    <View style={{ marginLeft: 10, flex: 1, paddingVertical: 5 }}>
                        <Text
                            style={[
                                styles.EventsTextStyle,
                                { color: '#000', marginVertical: 5, fontSize: FONTSIZE.Text16 },
                            ]}>
                            {item?.title}
                        </Text>
                        <Text
                            style={[
                                styles.EventsTextStyle,
                                {
                                    color: '#000',
                                    marginVertical: 3,
                                    fontSize: FONTSIZE.Text13,
                                    fontFamily: 'AvenirNext-Medium',
                                },
                            ]}>
                            {item?.location?.addressStr}
                        </Text>
                        <Text
                            style={[
                                styles.EventsTextStyle,
                                {
                                    color: '#000',
                                    marginVertical: 3,
                                    fontSize: FONTSIZE.Text13,
                                    fontFamily: 'AvenirNext-Medium',
                                },
                            ]}>
                            {/* {'Dec. 31, 7:00 PM'} */}
                            {moment.utc(item?.date).format(RegexCollection.PartyTimeFormat)}
                        </Text>
                    </View>
                </View>
                {/* This can be used as component */}
            </TouchableOpacity>
        );
    };

    const handleSubmit = async () => {
        setLoader(true);



        await ApiClient.authInstance
            .get(ApiClient.endPoints.filtersEvents, {
                params: {
                    'thisWeek': thisWeek
                }
            })
            .then(async i => {
                MobxStore.authStore.async.reloadUser();
                console.log("Response after filter Hit-->", i.data[0]);
                if (i.status == 201 || i.status == 200) {
                    setFilteredEvents(i.data)
                    setLoader(false);
                }
            })
            .catch(e => {
                console.log(e);
                setLoader(false);
            });
        setLoader(false);
    }

    return (
        <ScrollView style={{ flex: 1 }}
            contentContainerStyle={{}}>
            <View style={{ paddingHorizontal: 10, backgroundColor: '#FBFBFB', flex: 1 }}>
                <Text style={[styles.textStyle, { color: '#999999', paddingTop: 10, paddingBottom: 5 }]}> {"Find events in"}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text17, fontFamily: 'AvenirNext-Medium' }]}> {"Westwood, Los Angeles"}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ChangeBlue height={18} width={18} />
                        <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text17, color: '#1FAEF7', marginLeft: 5 }]}> {"Change"}</Text>
                    </View>
                </View>


                <FlatList
                    data={['Today', 'Tomorrow', 'This week',]}
                    renderItem={renderItem}
                    keyExtractor={(index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: getHp(30), marginBottom: getHp(10) }}
                />

                <FlatList
                    data={['18+', '21+']}
                    renderItem={renderItem}
                    keyExtractor={(index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: getHp(5), marginBottom: getHp(20) }}
                />

                <Text style={[styles.textStyle, {
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text18,
                    marginVertical: 5
                }]}> {"Price range"}</Text>

                <Text style={[styles.textStyle, {
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text14,
                    color: '#999999'
                }]}> {"$0 - $500+"}</Text>


                <RangeSlider
                    style={styles.sliderStyle}
                    min={0}
                    max={100}
                    step={1}
                    floatingLabel
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}

                />

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#4EC3FF', '#55C6FF', '#83D9FF']}
                    style={[
                        styles.linearGradient,
                        { width: '100%', height: getHp(38), borderRadius: 13 },
                    ]}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={[{
                            color: '#fff',
                            fontSize: FONTSIZE.Text16,
                            fontFamily: 'AvenirNext-Medium'
                        }]}>{'Apply'}</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {
                    filteredEvents.length > 0 &&
                    <FlatList
                        data={filteredEvents}
                        renderItem={renderEvents}
                        keyExtractor={(index) => index}
                        style={{ marginTop: getHp(5), marginBottom: getHp(20) }}
                    />
                }

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    EventsTextStyle: {
        color: '#FFFFFF',
        fontSize: FONTSIZE.Text13,
        fontFamily: 'AvenirNext-Bold',
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    searchBarStyle: {
        elevation: 0,
        borderRadius: 9,
        backgroundColor: '#F2F5F6',
        height: getHp(32),
        fontSize: FONTSIZE.Text14,
        width: '80%',
        alignSelf: 'center'
    },
    sliderStyle: {
        marginVertical: 20,
    },
    tagsStyle: {
        backgroundColor: '#F2F5F6',
        borderRadius: 13,
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: getWp(10),
    },
    linearGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        elevation: 2,
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 20,
    },
    QRcontainer: {
        elevation: 5,
        padding: 30,
        borderRadius: 42,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        paddingTop: 80,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    textStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text14,

    },
    allFrnds: {
        width: '100%',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 2,
        backgroundColor: '#FFFFFF',
        height: 46
    },
});

EventsTab.routeName = '/EventsTab'
