import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, TextInput, FlatList } from 'react-native'
import { Scaffold, Header, CustomText } from '@components'
import { Avatar } from 'react-native-elements';
import { Girl } from '@assets'
import { Rating, AirbnbRating } from 'react-native-ratings';
import TapRating from '../../components/RatingStar/TapRating'
import { FONTSIZE } from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { getHp } from '@utils';
import Spinner from "react-native-loading-spinner-overlay";
import { getWp } from '../../app/utils';
import Back from 'react-native-vector-icons/Ionicons';

const DATA = [
    'Great work ethic',
    'Problem solver',
    'Organized',
    'Problem solver'
]

export default function RatingPage(props) {
    const [loader, setLoader] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.feedbackButtons, styles.shadowStyle]}>
                <Text style={[{ fontSize: FONTSIZE.Text14, fontFamily: 'AvenirNext-Regular', }]} >
                    {item}
                </Text>
            </View>
        )
    }

    return (
        <Scaffold statusBarStyle={{ backgroundColor: '#FBFBFB' }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"always"}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    backgroundColor: '#FBFBFB',

                }}>
                <Spinner visible={loader} color={"#1FAEF7"} />
                {!loader && (
                    <View>
                        <View style={{
                            marginVertical: getHp(15),
                            
                        }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                            >
                                <Back name="chevron-back" color={'#000'}
                                    style={{ marginRight: 20, marginLeft: 10 }}
                                    size={30} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Avatar
                                rounded
                                source={Girl}
                                size={100}
                            />

                            <Text style={[styles.reviewsTitleStyle, { fontSize: FONTSIZE.Text18,marginTop:getHp(5) }]} >
                                {"Lindsey Vetrovs"}
                            </Text>

                            <View style={{ marginTop: 10 }}>
                                <TapRating StarSize={18}
                                    styleProp={{ backgroundColor: '#F2F5F7' }} />
                            </View>
                        </View>

                        <View style={styles.partition} />

                        <TextInput
                            placeholder={'Write a reiview...'}
                            placeholderTextColor={'#AAAAAA'}
                            style={{
                                fontFamily: 'AvenirNext-Medium',
                                fontSize: FONTSIZE.Text16,
                                marginHorizontal: getWp(20),
                                marginBottom: getHp(150)
                            }}
                            multiline

                        />

                        <View style={{ paddingHorizontal: getWp(10) }}>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={index => index}
                                contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>
        </Scaffold>
    )
}

RatingPage.routeName = "/RatingPage";



const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    feedbackButtons: {
        marginRight: getWp(10),
        marginBottom: getHp(5),
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: getHp(10),
        paddingVertical: getHp(5)
    },
    partition: {
        height: getHp(0.5),
        backgroundColor: '#EBEBEB',
        marginVertical: getHp(20),
        marginHorizontal: getWp(20)
    },
    container: {
        backgroundColor: '#F2F5F6',
        marginBottom: getHp(90),
        borderRadius: 8
    },
    secondContainer: {
        backgroundColor: '#212121',
        padding: 10,
        borderRadius: 8
    },
    reviewHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    userReviewSection: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '62%',
        justifyContent: 'space-between'
    },
    reviewsTitleStyle: {
        // letterSpacing: 0.5,
        color: '#000',
        fontSize: FONTSIZE.Text24,
        fontFamily: 'AvenirNext-DemiBold',
        // fontWeight:'bold'
    },
    viewAllStyle: {
        color: '#1FAEF7',
        fontSize: 18,
        fontFamily: 'AvenirNext-Regular',
    },
    userFeedbackTextStyle: {
        color: '#fff',
        fontSize: 20,
        opacity: 0.6,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Regular',
    }

})