import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Root, ImageCarousel, Media, CustomSearchbar, Footer, CustomText } from '@components'
import { FONTSIZE } from '@utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Girl,
    DJ,
    DJ1,
    DJ2,
} from '@assets'
const { height, width } = Dimensions.get("screen")
const imageArray = [DJ, DJ1, DJ2]
import { BlackFilter } from '@svg'



export default function NewsFeed() {
    const [state, setState] = useState(0)
    const [hideSearch, showSearch] = useState(false)

    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
        />
    }
    return (
        <Root>
            <ScrollView>
                {!hideSearch ?
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => showSearch(!hideSearch)}>
                            <Icon name="search-sharp" size={23} color={"#000"} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{"BOUNCE"}</Text>
                        <Text style={styles.headerTitle}></Text>
                    </View>
                    :
                    <View style={{ margin: 10 }}>
                        <CustomSearchbar
                            placeholder={"Search events, activities, hosts... "}
                            onPress={() => showSearch(!hideSearch)}
                        />
                    </View>

                }

                {!hideSearch ?
                    <View style={styles.container}>
                        <View style={styles.firstBlock}>
                            <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text20 }]}>{"Personalize your news feed!"}</Text>

                            <TouchableOpacity style={styles.addInterest}>
                                <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text20, color: '#1FAEF7' }]}>{"Add Interests"}</Text>
                            </TouchableOpacity>

                            <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text16, fontWeight: 'normal' }]}>{"Interests are private to you."}</Text>
                        </View>

                        <View style={styles.eventList}>
                            <Media newsFeed
                                mainHeading={"For You"} />
                        </View>
                    </View>
                    : null}

            </ScrollView>
        </Root>
    )
}
const styles = StyleSheet.create({
    eventList: {

    },
    firstBlock: {
        height: height / 4,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        paddingVertical: 5,
        alignItems: 'center',

    },
    addInterest: {
        elevation: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 24
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999',
    },
    headerTitle: {
        alignContent: 'center',
        color: '#000',
        fontSize: FONTSIZE.Text31,
        fontWeight: 'bold',
        fontFamily: 'AvenirNext',
    },

})