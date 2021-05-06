import React,{useRef} from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { CustomButton } from '@components';
import { Cancel } from '@assets';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';

export default function OfferCard(props) {
   
    const {
        containerProps,
        onPressCross,
        cancel = false,
        parentState=false,
        getVendor
    } = props
    const [getState, setState] = React.useState(true)
    console.log("GETVENDORcard",getVendor)
    return (
        <View>
            { getVendor ?
                <View style={[styles.offerCardContainer, containerProps]}>
                    <TouchableOpacity onPress={parentState} >
                        <Image source={Cancel} style={{ position: 'absolute', right: 25, top: 15 }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.offerCardView}>
                            <Text style={styles.percentTextStyle}>5%</Text>
                        </View>
                        <Text style={styles.offAnyOrder}>OFF ANY ORDER</Text>
                        <Text style={styles.upto300}>Up to $300</Text>

                        <CustomButton
                            Pay
                            ButtonTitle={"Reedem Now"}
                            ContainerStyle={styles.ContainerStyle}
                            ButtonStyle={styles.ButtonStyle}
                            TitleStyle={styles.TitleStyle}
                        />
                    </View>
                </View>
                : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    offerCardContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(1, 106, 158, 0.24)',
        // alignItems: 'center',
        paddingVertical: 10,
        width: '100%',

    },
    offAnyOrder: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginVertical: 5
    },
    upto300: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: 'normal',
        marginVertical: 5
    },
    offerCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 50,
        width: 50,
        marginVertical: 10
    },
    percentTextStyle: {
        // backgroundColor: '#FFFFFF',
        // borderRadius:50
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold'
    },
    ContainerStyle: {
        // width: '100%',
        marginVertical: 10
    },
    ButtonStyle: {
        paddingHorizontal: 0,
        backgroundColor: '#292929',
        borderRadius: 12,
        width: '100%',
    },
    TitleStyle: {
        fontSize: 18,
        color: '#1FAEF7'
    },
})
