import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { CustomSearchbar, Scaffold, SearchPageTab } from '@components';
import { FONTSIZE, getHp, getWp } from '@utils';
import { ChangeBlue } from '@svg';
import Back from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';

import Thumb from '../Search/basic/Thumb'
import Rail from '../Search/basic/Rail'
import RailSelected from '../Search/basic/RailSelected'
import Label from '../Search/basic/Label'
import Notch from '../Search/basic/Notch'
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'rn-range-slider';
// import Thumb from './basic/Thumb'
// import Rail from './basic/Rail'
// import RailSelected from './basic/RailSelected'
// import Label from './basic/Label'
// import Notch from './basic/Notch'



export default function DesignCanva(props) {
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



    return (<Scaffold statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
        <View style={{ marginVertical: getHp(15), flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{}}>
                <Back name="chevron-back" color={'#000'}
                    style={{ marginRight: 20, marginLeft: 10 }}
                    size={30} />
            </TouchableOpacity>


            <Searchbar
                placeholder={"Search events"}
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{
                    fontSize: FONTSIZE.Text16,
                    fontFamily: 'AvenirNext-Regular',
                    alignSelf: 'center'
                }}
                style={styles.searchBarStyle}
                iconColor={"#999999"}
                
                placeholderTextColor={"#909090"}
            />

        </View>
        <SearchPageTab {...props} />

    </Scaffold>
    );
};
const styles = StyleSheet.create({
    searchBarStyle: {
        elevation: 0,
        borderRadius: 9,
        backgroundColor: '#F2F5F6',
        height: getHp(32),
        width: '80%',
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

DesignCanva.routeName = '/DesignCanva';

{
    /* <Text style={[styles.textStyle, { alignSelf: 'center', marginBottom: 10, fontFamily: 'AvenirNext-Bold', fontSize: FONTSIZE.Text22 }]} >
              {"Under Development"}
          </Text> */
}
{
    /* <Header headerTitle={"Custom Invitation"}
              back
              onPress={() => navigation.goBack()}
          />
          <View style={styles.subContainer}>
  
              <Text style={[styles.textStyle, { alignSelf: 'center', marginBottom: 10, fontFamily: 'AvenirNext-Bold', fontSize: FONTSIZE.Text22 }]} >
                  {"Adelson School Gala"}
              </Text>
              <Text style={[styles.textStyle, { alignSelf: 'center', marginBottom: 10 }]} >
                  {"Dec 31, 8:00 PM"}
              </Text>
  
              <Text style={[styles.textStyle, { textDecorationLine: 'underline', fontSize: FONTSIZE.Text14, fontFamily: 'AvenirNext-Medium', color: '#1FAEF7' }]}>
                  {"8440 W. Lake Mead Blvd., Las Vegas,... "}
              </Text>
  
          </View>
  
  
          <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={[{ height: 56, borderRadius: 10, justifyContent: 'center', elevation: 2, backgroundColor: '#7B41E4', width: '80%' }]}>
                  <Text style={[{ fontSize: FONTSIZE.Text22, color: '#FDFCFD', alignSelf: 'center' }]} >
                      {"Design with Canva"}
                  </Text>
              </TouchableOpacity>
          </View> */
}
