import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTSIZE } from '@utils'
import { StarWhite } from '@svg'

export default function Ratings({ rating }) {

    let backcolor = "#999999"

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: rating == 'N/A' ? '#CCCCCC' : '#F8A41E', borderRadius: 5, padding: 2 }}>
                    <StarWhite height={18} width={18} />
                </View>
                <Text style={{ color:rating == 'N/A' ? '#BBBBBB' : '#000', fontSize: FONTSIZE.Text16, marginLeft: 5 }}>{rating}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})