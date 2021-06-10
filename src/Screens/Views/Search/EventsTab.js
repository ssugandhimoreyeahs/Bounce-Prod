import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, ScrollView,StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { QRCodes, Scaffold, SearchPageTab } from '@components';
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


export default function EventsTab(props) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        // setLow(low);
        // setHigh(high);
    }, []);


    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <TouchableOpacity style={styles.tagsStyle}>
                <Text style={[styles.textStyle, {
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text16
                }]}> {item}</Text>
            </TouchableOpacity>
        )
    }
    return (<ScrollView style={{flex:1}} contentContainerStyle={{}}>
        <View style={{ paddingHorizontal: 10,backgroundColor:'#FBFBFB',flex:1 }}>
            <Text style={[styles.textStyle, { color: '#999999', paddingTop: 10, paddingBottom: 5 }]}> {"Find events in"}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text17, fontFamily: 'AvenirNext-Medium' }]}> {"Westwood, Los Angeles"}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ChangeBlue height={18} width={18} />
                    <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text17, color: '#1FAEF7', marginLeft: 5 }]}> {"Change"}</Text>
                </View>
            </View>


            <FlatList
                data={['Today', 'Tomorrow', 'Today', 'Tomorrow', 'Today', 'Tomorrow']}
                renderItem={renderItem}
                keyExtractor={(index) => index}
                horizontal
                style={{ marginVertical: 20 }}
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
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={[{
                        color: '#fff',
                        fontSize: FONTSIZE.Text16,
                        fontFamily: 'AvenirNext-Medium'
                    }]}>{'Apply'}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
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
        marginVertical: 20
    },
    tagsStyle: {
        backgroundColor: '#F2F5F6',
        borderRadius: 13,
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
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
