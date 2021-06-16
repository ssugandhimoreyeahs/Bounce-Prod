import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CustomImagePicker, CustomText } from '@components'
import { Avatar } from 'react-native-elements';
import { Girl } from '@assets'
import { Rating, AirbnbRating } from 'react-native-ratings';
import TapRating from '../../components/RatingStar/TapRating'
import { FONTSIZE } from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { getHp } from '../../app/utils';

export default function ReviewCard(props) {
    const {
        styleProp,
    } = props
    return (

        <View style={[styles.container, styleProp]}>
            <View style={styles.reviewHeading}>
                <Text style={styles.reviewsTitleStyle} >{"Reviews"}</Text>
            </View>

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', height:200 }}>
                <Text style={{ fontSize: FONTSIZE.Text16, color: '#696969' }} >{"No review's available."}</Text>
            </View>

            {/* <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <TapRating StarSize={25} />
            </View> */}
            {/* <CustomImagePicker /> */}
            {/* <View style={[styles.secondContainer, styleProp]}>
                <View style={styles.userReviewSection}>
                    <Avatar
                        rounded
                        source={Girl}
                        size='large'
                    />
                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'column' }}>
                        <Text style={[styles.reviewsTitleStyle, { fontSize: FONTSIZE.Text18 }]} >{"Lindsey Vetrovs"}</Text>
                        <Text style={{ fontSize: FONTSIZE.Text14, color: '#696969' }} >{"4 Months ago"}</Text>


                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TapRating StarSize={18}
                        styleProp={{ backgroundColor: '#fff', }} />
                </View>
                <CustomText
                    styleProp={{ color: '#000' }}
                    TextData={"DJ Nathan made my wedding a night to remember! He knows what every crowd wants to hear. Mixing music unlike any other. "}
                />
            </View> */}
        </View>
    )
}
const styles = StyleSheet.create({
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
        letterSpacing: 0.5,
        color: '#000',
        fontSize: FONTSIZE.Text18,
        fontFamily: 'AvenirNext-Medium',
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