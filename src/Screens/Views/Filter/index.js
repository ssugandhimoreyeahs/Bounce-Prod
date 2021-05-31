import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import {
    Header,
    Root,
    VendorCard,
    Checkbox
} from '@components'
import { FONTSIZE, getHp, getWp } from '@utils'
import { useDispatch } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import { YellowStar } from '@svg'

const DATA = ["Guard card", "Taser", "Guard card", "Taser", "Tesase"]
const multipleFlex = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.label}>{item}</Text>
            <Checkbox />
        </View>
    )
}

export default function Filter(props) {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);


//     const handleStar = () => {
//         let i = index
//         return (<View>
//             <View style={styles.starStyle}>
//                 {
//  for(index; index<i + 1; index) {
//                     <YellowStar height={20} width={20} />
//                 }
//                 }
//             </View>
//         </View>
//         )
//     }


    return (
        <Root>
            <Spinner visible={loader} color={'#1FAEF7'} />
            { !loader &&
                <ScrollView style={{ flex: 1 }}>
                    <Header
                        headerBackColor={{ backgroundColor: '#fff' }}
                        back
                        headerTitle={"Filters"}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View style={styles.container}>

                        {/* <FlatList
                            data={DATA}
                            keyExtractor={(index) => index}
                            renderItem={hadleStar}

                        /> */}



                        <View>
                            <Text style={[styles.label, { fontSize: FONTSIZE.Text20, fontFamily: 'AvenirNext-Bold', marginVertical: 5, fontWeight: 'bold' }]}>
                                {"Guard certification"}
                            </Text>
                            <FlatList
                                data={DATA}
                                renderItem={multipleFlex}
                                keyExtractor={(index) => index}
                            />
                        </View>
                    </View>
                </ScrollView>
            }
        </Root >
    )
}

const styles = StyleSheet.create({
    starStyle: {
        height: 30,
        width: 26,
        backgroundColor: '#EEEEEE',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text18,
        marginLeft: 40,
        fontFamily: 'AvenirNext-Regular',
        marginVertical: getHp(20)
    },
    iconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#fff',
        marginVertical: 1
    },
    container: {
        backgroundColor: '#FBFBFB',

    },
    label: {
        // marginLeft: getWp(10),
        fontSize: FONTSIZE.Text14,
        color: '#000'
    },
})
