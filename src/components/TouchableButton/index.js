import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { Info } from '@svg';

export default function TouchableButton(props) {
    const {
        ButtonTitle,
        ContainerStyle,
        ButtonStyle,
        TitleStyle,
        Pay,
        icon
    } = props
    return (
        <TouchableOpacity style={[ButtonStyle]}>
            {icon}
           {ButtonTitle ? <Text style={[{ color: '#000', fontSize: 18 }, TitleStyle]}>
                {ButtonTitle}
            </Text> : null }
        </TouchableOpacity>

    )
}
