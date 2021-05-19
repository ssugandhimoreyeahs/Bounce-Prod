import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FONTSIZE } from '@utils'
import { Avatar } from 'react-native-elements'
import { Girl } from '../../../assets'
import { RenderSmallButton } from '@components'
import { FlatList, } from 'react-native-gesture-handler'
import CreateInvitation from '../../BounceVendors/PlanParty/CreateInvitation'

export default function Tab1(props) {
    const { DATA } = props
    console.log("VALUE OF PROPS-->", props)
    const renderItems = ({ items, index }) => {

        return (
            <TouchableOpacity onPress={() => props.navigation.navigate(CreateInvitation.routeName)}
                key={index}
                style={{ backgroundColor: '#FBFBFB', padding: 10 }}>
                {/* This can be used as component */}
                <View style={{ backgroundColor: '#fff', borderRadius: 10, flex: 1, flexDirection: 'row' }}>
                    <Avatar source={Girl} size={125} avatarStyle={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />

                    <Text style={[styles.textStyle, { position: 'absolute', color: '#fff', backgroundColor: '#1FAEF7', borderTopLeftRadius: 10, padding: 5 }]}>
                        {"Draft"}
                    </Text>

                    <View style={{ marginLeft: 10, flex: 1, paddingVertical: 5 }}>
                        <Text style={[styles.textStyle, { color: '#000', marginVertical: 5, fontSize: FONTSIZE.Text16 }]}>
                            {"Adelson School Gala"}
                        </Text>
                        <Text style={[styles.textStyle, { color: '#000', marginVertical: 3, fontSize: FONTSIZE.Text13, fontFamily: '500' }]}>
                            {"9700 Hillpointe Rd."}
                        </Text>
                        <Text style={[styles.textStyle, { color: '#000', marginVertical: 3, fontSize: FONTSIZE.Text13, fontFamily: '500' }]}>
                            {"Dec. 31, 7:00 PM"}
                        </Text>
                    </View>
                </View>
                {/* This can be used as component */}
            </TouchableOpacity>
        );
    }
    const renderStatic = ({ item, index }) => {
        // console.log("DATA STATIC", item);
        return (<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <View style={styles.numberingStyle}>
                <Text style={styles.numberTextStyle}>{index + 1}</Text>
            </View>
            <Text style={[styles.numberTextStyle, { fontSize: FONTSIZE.Text16, fontFamily: '500', marginLeft: 10 }]}>{item}</Text>
        </View>
        )
    }
    return (<View>
        {/* This flatlist will work when user created the CreateInvitation */}
        {/* { <FlatList
            data={DATA}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItems}
            keyExtractor={(index) => index}
        />} */}
        {/* This flatlist will work  when user created the CreateInvitation */}


        {/* This flatlist is will work when user login first time on dashboard or not created any Invitation */}
        <View style={{ paddingVertical: 10,backgroundColor:'#FBFBFB' }}>
            <FlatList
                data={props.DATA}
                showsHorizontalScrollIndicator={false}
                renderItem={renderStatic}
                keyExtractor={(index) => index}
            />
            <Text style={[styles.numberTextStyle, { fontSize: FONTSIZE.Text16, marginVertical: 15 }]}>
                {"Click “+” to get started!"}
            </Text>
        </View>
          {/* This flatlist is will work when user login first time on dashboard or not created any Invitation */}
    </View>

    )
}
const styles = StyleSheet.create({
    numberTextStyle: {
        color: '#000000',
        fontSize: FONTSIZE.Text14,
        fontFamily: 'ANB',
    },
    numberingStyle: {
        height: 24,
        width: 24,
        backgroundColor: '#F2F5F6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: FONTSIZE.Text13,
        fontFamily: 'ANB',
    }
})