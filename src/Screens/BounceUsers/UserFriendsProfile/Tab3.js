import React from 'react'
import { View, Text } from 'react-native'
import {
    BluePerson,
    OrangeSaved,
} from '@svg'
import { getHp,FONTSIZE } from '../../../app/utils'


export default function Tab3() {
    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <OrangeSaved height={40} width={40}
                style={{marginVertical:getHp(20)}} />
            <Text style={{width:'70%',textAlign:'center',fontFamily:'AvenirNext-Regular',fontSize:FONTSIZE.Text16}}>{"Bookmark an event on the newsfeed to mark it as Interested"}</Text>
        </View>
    )
}
