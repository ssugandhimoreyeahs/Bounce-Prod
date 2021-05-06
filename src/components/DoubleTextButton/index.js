import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { Message, Delete, ThreeDots, Girl } from '@assets';

export default function TouchableButton(props) {
    const {
        floatingLabel,
        ButtonTitle2,
        ContainerStyle,
        ButtonStyle,
        Title1Style,
        Title2Style,
        Strike,
        icon
    } = props
    return (
        <TouchableOpacity style={[ButtonStyle, {}]}>
            <Text style={[Title1Style]}>
                {floatingLabel}</Text>

            <Text style={[Title2Style]}>
                {ButtonTitle2}</Text>
        </TouchableOpacity>

    )
}
