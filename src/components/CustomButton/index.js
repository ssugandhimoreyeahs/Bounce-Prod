import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { FONTSIZE, getHp, getWp } from '@utils'
import LinearGradient from 'react-native-linear-gradient';



export default function CustomButton(props) {
    const {
        onSaveDraftPress = () => { },
        onContinuePress = () => { },
        ButtonTitle = false,
        ButtonTitle2 = false,
        bar = false,
        containerStyleProp=false,
        buttonTextStyle = false,
        complete = false,
        onPress = () => { },
        linear = false,
        rowDoubleButton = false,
        colDoubleButton = false,
        theme = false,
        onPress1 = () => { },
        userContinue = false,
    } = props
    return (
        <View >
            {
                userContinue &&
                <TouchableOpacity
                    style={[styles.linearGradient,
                    styles.shadowStyle,
                    { backgroundColor: '#FFFFFF' }]}
                    onPress={onPress}>
                    <Text style={[styles.titleStyle, {
                        letterSpacing: 0.6,
                        color: '#1FAEF7',
                    }]}>
                        {ButtonTitle ? ButtonTitle : "Continue"}</Text>

                </TouchableOpacity>
            }
            {
                linear ?
                    <>
                        <TouchableOpacity style={{}} onPress={onPress}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']} style={styles.linearGradient}>

                                <Text style={[styles.titleStyle]}>
                                    {ButtonTitle ? ButtonTitle : "Continue"}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </>
                    :
                    null
            }
            {complete ?
                <View style={{ backgroundColor: '#FEFEFE', }}>
                    <Button
                        title={ButtonTitle ? ButtonTitle : "Continue"}
                        containerStyle={[styles.container, containerStyleProp]}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={[styles.titleStyle, buttonTextStyle]}
                        onPress={onPress}
                    />

                </View>
                : null
            }
            {  rowDoubleButton ?
                <>
                    <View style={styles.rowButton}>
                        <TouchableOpacity style={[styles.DoubleButton, styles.shadowStyle]} onPress={onSaveDraftPress}>
                            <Text style={[styles.titleStyle, {
                                fontFamily: 'AvenirNext-DemiBold',
                                color: '#1FAEF7',
                                fontSize: FONTSIZE.Text20,
                                letterSpacing: 0.2
                            }]}>
                                {ButtonTitle}
                            </Text>
                        </TouchableOpacity>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#3CBDFF', '#6FD0FF']}
                            style={[
                                styles.DoubleButton,
                                {

                                }]}>
                            <TouchableOpacity onPress={onContinuePress}>
                                <Text style={[styles.titleStyle, {
                                    fontFamily: 'AvenirNext-DemiBold', color: '#fff',
                                    fontSize: FONTSIZE.Text20, letterSpacing: 0.2
                                }]}>
                                    {ButtonTitle2}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </>
                : null}
            {  colDoubleButton ?
                <>
                    <View style={[styles.shadowStyle, {
                        alignItems: 'center',
                        marginVertical: getHp(10),
                        backgroundColor: 'rgba(255, 255, 255, 0.66)', paddingTop: 10
                    }]}>

                        <TouchableOpacity
                            style={[styles.colButtonStyle,
                            styles.shadowStyle]}
                            onPress={onPress1}>
                            <Text style={[{
                                color: '#1FAEF7',
                                fontSize: FONTSIZE.Text20,
                                fontFamily: 'AvenirNext-Medium',

                            }]}>
                                {ButtonTitle}
                            </Text>
                        </TouchableOpacity>

                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#3CBDFF', '#73D1FF']}
                            style={[
                                styles.colButtonStyle,
                            ]}>
                            <TouchableOpacity onPress={onPress}
                                style={styles.fullTouch}>
                                <Text style={[styles.titleStyle, {

                                    color: '#fff',
                                    fontSize: FONTSIZE.Text20,
                                    fontFamily: 'AvenirNext-DemiBold', letterSpacing: 0.2
                                }]}>
                                    {ButtonTitle2}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </>
                : null}

        </View>
    )
}
const styles = StyleSheet.create({
    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: getHp(0),
        borderTopWidth: 0.5,
        borderColor: '#CCCCCC',
        marginVertical: getHp(20),
        paddingTop: 10
    },

    colButtonStyle: {
        height: getHp(50),
        width: '95%',
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: getHp(5)
    },
    DoubleButton: {
        height: getHp(50),
      width:'46%',
        elevation: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 13,
        marginTop: 10,
        marginBottom: 5
    },
    barStyle: {
        height: getHp(5),
        backgroundColor: '#FEFEFE',
        marginBottom: getHp(5),
        marginTop: getHp(10),
        width: getWp(134),
        alignSelf: 'center',
        borderRadius: 100
    },
    buttonStyle: {
        backgroundColor: '#1FAEF7',
        // height: getHp(54),
        borderRadius: 13,
    },
    titleStyle: {
        fontSize: FONTSIZE.Text22,
        color: '#fff',
        fontFamily: 'AvenirNext-DemiBold'
    },
    fullTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
    },
    linearGradient: {
        borderRadius: 17,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        marginVertical: 10,

    },
})