import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { Message, Delete, ThreeDots, Girl } from '@assets';

export default function VerticalDoubleButton(props) {
    const {
        ButtonTitle,
        ContainerStyle,
        ButtonStyle,
        TitleStyle,
        Pay,
        icon,
        indicatorValue=false,
        afterInviteTitle=null
    } = props
    return (
        <TouchableOpacity style={[ButtonStyle, {justifyContent:'space-around',flexDirection:'row'}]}>
          <View style={{alignItems:'center'}}>
          <Image source={icon} style={{marginRight:0}}/>
            <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
               { !indicatorValue ?  ButtonTitle : afterInviteTitle }</Text>
              </View>
              {
                  indicatorValue ?
                  <Text style={{ color: '#1FAEF7', fontSize: 35 }}>
                  {indicatorValue}</Text>
                  : null
              }
        </TouchableOpacity>

    )
}
