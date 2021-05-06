import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function UnderlineText(props) {
    const {
        underlineText = null,
        styleTextProp = null,
        styleContainerProp = null
    } = props
    return (
        <TouchableOpacity style={styleContainerProp}>
            <Text style={[styles.textStyle, styleTextProp]}>{underlineText}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        color: '#F6B132',
        textDecorationLine: 'underline',
        fontFamily: 'normal',
        
    },
})
