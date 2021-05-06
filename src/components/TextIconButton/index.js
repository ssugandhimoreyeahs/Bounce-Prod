import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FONTSIZE } from '@utils'
export default function TextIconButton(props) {
    const {
        title = null,
        icon = null,
        textStyleProp = null,
        containerProp = null,
        onPress = () => { }
    } = props
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, containerProp]}>
            <Text style={[styles.textStyle, textStyleProp]}>
                {title}
            </Text>
            {icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    threeBlocksContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 20,
    },
    threeBlockHeading: {
        fontSize: 17,
        color: '#fff',
        opacity: 0.8
    },
    threeBlockBodyText: {
        fontSize: 24,
        color: '#fff',
        // opacity:0.8
    },
    threeBlocks: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    directionView: {
        borderRadius: 20,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#212121',
    },
    container: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#212121',
        borderRadius: 13,
        paddingVertical: 5,
        marginVertical: 10,
        alignItems: 'center'
    },
    // container: {
    //     flex: 1,
    //     // flexDirection: 'row',
    //     backgroundColor: '#000000',

    // },
    iconStyle: {
        //   height:20,
        //   width:20,
        paddingRight: 0,
        marginRight: 5

    },
    textStyle: {
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text16,
        // opacity: 0.8,
        fontWeight: 'bold'
        //  textAlign:'left'
    },
    belowTextStyle: {
        color: '#fff',
        fontSize: 18,
        opacity: 0.8,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        opacity: 0.5,
        marginBottom: 5
    },
    BasePackageTitle: {
        color: '#fff',
        fontSize: 18,
        opacity: 0.5,
        marginBottom: 5
    },
    websiteImageStyle: {
        height: 80,
        width: 150,
        borderRadius: 15
    },
    subContainer: {
        // flex:1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    websiteUrlStyle: {
        alignSelf: 'center',
        color: '#1FAEF7',
        fontSize: 12,
    },
    hostDetail: {
        color: '#fff',
        fontSize: 20,
        opacity: 0.9,
        // marginBottom:10,
        textAlign: 'center',
        marginVertical: 15

    },
    iconWithBelowTextStyle: {
        height: 80,
        width: 80,
        // marginRight:15

    },
})

