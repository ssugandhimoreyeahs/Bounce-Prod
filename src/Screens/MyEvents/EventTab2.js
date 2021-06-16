import { Item } from 'native-base';
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { DJ } from '@assets'
import { BlackOutlineHeart, FavouritedHeart } from '@svg'
import { FONTSIZE } from '../../app/utils';

const DATA = [
    {
        name: "SHUMR",
        image: DJ,
        time: "SHUMR",
    },
    {
        name: "SHUMR",
        image: DJ,
        time: "SHUMR",
    },
    {
        name: "Hakkasan",
        image: DJ,
        time: "SHUMR",
    },
];

export default function EventTab2() {
    const [save, setSave] = React.useState(false)

    const renderSmallButton = ({ item }) => {
        return (
            <View key={item.index}>
                <View style={{backgroundColor:'#FBFBFB', justifyContent: 'space-between', flexDirection: 'row', flex: 1, width: '100%', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Avatar source={item.image} size={40} rounded />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: '#000', fontFamily: 'AvenirNext-Medium', fontSize: FONTSIZE.Text16 }}>{item.name}</Text>
                            <Text style={{ color: '#999999', fontFamily: 'AvenirNext-Medium', fontSize: FONTSIZE.Text14 }}>{item.name}</Text>
                        </View>
                    </View>

                    {save ? <TouchableOpacity onPress={() => setSave(!save)}>
                        <FavouritedHeart height={20} width={22} />
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => setSave(!save)}>
                            <BlackOutlineHeart height={20} width={22} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ marginVertical: 5, backgroundColor: 'rgba(238, 238, 238, 0.75)', height: 1 }} />
            </View>
        )
    }
    return (
        <View style={{backgroundColor:'#FBFBFB', flex: 1, paddingTop: 10, marginHorizontal: 10 }}>
            <FlatList
                data={DATA}
                renderItem={renderSmallButton}
                keyExtractor={(index) => index}

            />
            <TouchableOpacity style={[styles.allFrnds,{}]}>
                <Text style={[styles.aboutText, { fontWeight: "bold" }]}>
                    {"All Vendors"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    allFrnds: {
        elevation: 2,
        marginVertical: 20,
        borderRadius: 9,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10
    },
    aboutText: {
        marginVertical: 3,
        color: '#000',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Regular'
    },
})