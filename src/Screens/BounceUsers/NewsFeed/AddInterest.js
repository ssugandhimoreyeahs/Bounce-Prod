import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Root, ImageCarousel, Media, Header, Footer, CustomText } from '@components'
import { FONTSIZE, getHp } from '@utils'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    Girl,
    DJ,
    DJ1,
    DJ2,
} from '@assets'
import { AppleMusic, Spotify } from '@svg'

const { height, width } = Dimensions.get("screen")
const imageArray = [DJ, DJ1, DJ2]

const INTEREST = [
    {
        categoryHeading: 'Entertainment',
        categoryList:
            ['Concerts', 'Broadway', 'Comedy', 'Gaming']

    },
    {
        categoryHeading: 'Sports',
        categoryList:
            ['⛳️ Golf', 'Basketball', 'Soccer', 'Hockey']

    },
    {
        categoryHeading: 'Life',
        categoryList:
            ['Dating', 'Traveling', 'Support', 'Gaming']

    }
]
export default function NewsFeed() {
    const [state, setState] = useState(0)

    const SmallButton = ({ item }) => {
        console.log("ase", item);
        return (
            <TouchableOpacity style={styles.smallButtonStyle}>
                <Text style={[styles.headerTitle]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
        />
    }
    return (
        <Root>
            <Header
                back
                headerTitle={"Add Interests"}
            />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text20,marginTop:getHp(15) }]}>{"Music"}</Text>

                    <View style={styles.firstBlock}>
                        <TouchableOpacity style={styles.addInterest}>
                            <Spotify height={50} width={50} />
                            <Text style={[styles.headerTitle]}>{"Sync Spotify"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.addInterest}>
                            <AppleMusic height={50} width={50} />
                            <Text style={[styles.headerTitle]}>{"Sync Apple Music"}</Text>
                        </TouchableOpacity>
                    </View>

                    {INTEREST.map((item) => {
                        return (
                            <View style={{marginVertical:10}}>
                                <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text20,marginVertical:0 }]}>
                                    {item.categoryHeading}
                                </Text>
                                <View style={{ flexDirection: 'row', padding: 5,marginTop:5 }}>
                                    {
                                        item.categoryList.map((item) => <SmallButton item={item} />
                                        )
                                    }
                                </View>

                            </View>
                        )
                    })}

                </View>
            </ScrollView>

        </Root>
    )
}
const styles = StyleSheet.create({
    smallButtonStyle: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight:5,
        elevation: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingHorizontal: 10
    },
    firstBlock: {
        marginBottom:getHp(20),
        paddingTop:getHp(10),
        justifyContent: 'space-evenly',
        flexDirection: 'row',

        // paddingVertical: 5,
        // alignItems: 'center'
    },
    addInterest: {
        elevation: 5,
        backgroundColor: '#fff',
        height: getHp(130),
        width: getHp(150),
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999'
    },
    headerTitle: {
        // alignContent: 'center',
        color: '#000',
        fontSize: FONTSIZE.Text14,
        fontWeight: 'bold',
        fontFamily: 'AvenirNext-Regular',
    },

})