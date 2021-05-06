import React from 'react'
import { TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native'
import { View, Text } from 'react-native'
import { FONTSIZE, getHp } from '@utils'


export default CustomTextinput = (props) => {
    const {
        text,
        multiline,
        onChange,
        value = ''
    } = props
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={text}
                placeholderTextColor={"#000"}
                style={[styles.textStyle, { textAlignVertical: multiline ? 'top' : 'auto' }]}
                multiline={multiline}
                numberOfLines={multiline ? 9 : null}
                editable={false}
            />
            <View style={{ position: 'absolute', top: 40, left: 10, right: 10, width: '90%', marginBottom: 10, borderRadius: 9.5 }}>
                <TextInput
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={"#696969"}
                    style={[styles.TextInputStyle, { backgroundColor: '#fff', textAlignVertical: multiline ? 'top' : 'auto' }]}
                    multiline={multiline}
                    numberOfLines={multiline ? 5 : null}
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    TextInputStyle: {
        height: 110,
        marginTop: -10,
        color: '#000',
        fontWeight: 'bold',
        fontSize: FONTSIZE.Text17,
        fontFamily: 'Roboto-Bold',
    },
    container: {
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 9.5,
        padding: 0,
        marginVertical: 10,
        flexDirection: 'column'
    },
    textStyle: {
        paddingLeft: 10,
        // opacity: 0.9,
        color: '#000',
        fontSize: FONTSIZE.Text15,
        // lineHeight: 20,
        // letterSpacing: 0.5,
        backgroundColor: '#fff',
        fontFamily: 'AvenirNext',
        borderRadius: 10
    }
})