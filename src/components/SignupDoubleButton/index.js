import React, { useState, useRef, createRef } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements';
import { Message, Delete, ThreeDots, Girl } from '@assets';
import { FONTSIZE } from '@utils'

function SignupDoubleButton(props) {
    const {
        floatingLabel = null,
        ButtonTitle2 = null,
        ButtonStyle,
        Title1Style,
        Password = false,
        onChange,
        value
    } = props
    const focusRef = useRef(null)
    const [show, setShow] = useState(false)
    const handleRef = () => {
        focusRef.current.focus();
    }


    return (
        <TouchableOpacity style={[styles.ButtonStyle, ButtonStyle]}
        // onPress={handleRef}
        >

            <Text style={[ButtonTitle2 == null ? styles.Title2Style : styles.Title1Style, Title1Style, { marginBottom: 2 }]}>
                {floatingLabel}
            </Text>

            {true ?

                <TextInput
                    style={styles.TextInputStyle}
                    secureTextEntry={Password}
                    onChangeText={onChange}
                    value={value}
                />
                : null
            }
        </TouchableOpacity>

    )
}
export default SignupDoubleButton;


const styles = StyleSheet.create({
    TextInputStyle: {
        marginTop: -10,
        color: '#000',
        fontWeight: 'bold',
        fontSize: FONTSIZE.Text17,
        // backgroundColor:'red',
        // maxHeight:30
        fontFamily: 'AvenirNext-Regular',
    },
    ContainerStyle: {
        width: '100%',

    },
    ButtonStyle: {
        backgroundColor: '#f3f7f2',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingTop: 5,
        marginVertical: 5
    },
    Title1Style: {
        fontSize: FONTSIZE.Text15,
        opacity: 0.7,
        color: '#000',
        fontFamily: 'AvenirNext-Regular',
    },
    Title2Style: {
        fontSize: FONTSIZE.Text15,
        fontFamily: 'AvenirNext-Regular',
        // opacity:0.8,
        // fontWeight: 'bold',
        color: '#000'
    },
})
