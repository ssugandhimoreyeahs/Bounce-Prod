import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { FONTSIZE, getHp } from '@utils'

export default function IconTitle(props) {
    const {
        iconStyle,
        textStyle,
        icon,
        text,
        iconBelowText = false,
        styleProp = null
    } = props
    // console.log("ICON TITLE TEXT", text)
    return (

        // text != null ||  this was before //may be conflict
        text !== null ?
            (
                text !== '' ?

                    text?.length > 0 || text !== []  ?
                        <View>
                            <View style={styles.belowTextContainer}>
                                <View style={{ alignItems: 'center', width: '29%' }}>
                                    {icon}
                                    <Text style={[styles.belowHeading, textStyle, { opacity: 1 }]}>{iconBelowText} </Text>
                                </View>

                                <View style={{ width: '65%', marginTop: 15 }}>
                                    <Text style={[styles.belowHeading,  { fontWeight: 'normal', color: '#000000' }]}>{text}</Text>
                                </View>

                            </View>
                            <View style={styles.partition} />
                        </View>
                        : null
                    : null

            )


            : null

    )
}



const styles = StyleSheet.create({
    partition: {
        marginTop: 10,
        width: '90%',
        height: getHp(1),
        backgroundColor: '#DDD',
        alignSelf: 'center',

    },
    belowHeading: {
        fontSize: FONTSIZE.Text16,
        color: '#000',
        fontFamily: 'AvenirNext',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    belowTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20
    },

})
