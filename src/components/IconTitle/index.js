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
    return (
        text !== null ?
            (
                text !== '' ?

                    text?.length > 0 || text !== [] ?
                        <View>
                            <View style={styles.belowTextContainer}>
                                <View style={{ alignItems: 'center', width: '29%',backgroundColor:'#FBFBFB' }}>
                                    {icon}
                                    <Text style={[styles.belowHeading, textStyle, { fontSize: FONTSIZE.Text14, opacity: 1, fontFamily: 'AvenirNext-Bold',marginTop: 4}]}>{iconBelowText}
                                    </Text>
                                </View>

                                <View style={{ width: '65%', marginTop: 15,backgroundColor:'#FBFBFB' }}>
                                    <Text style={[styles.belowHeading, { fontWeight: 'normal',fontFamily: 'AvenirNext-DemiBold', color: '#000000' }]}>{text}
                                    </Text>
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
        width: '95%',
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
        paddingVertical: 20,
        backgroundColor:'#FBFBFB'
    },

})
