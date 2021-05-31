import React, { useState, useRef, createRef, Fragment } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { Button } from 'react-native-elements';
import { Message, Delete, ThreeDots, Girl } from '@assets';
import { FONTSIZE } from '@utils'
import DropDownPicker from 'react-native-dropdown-picker';

function CustomDropdown(props) {
    const {
        floatingLabel = null,
        DATA,
        multiple = false,
        showMargin = false,
        cb = () => { },
        onChange,
        value,
        selectedValues = ''
    } = props
    const focusRef = useRef(null)
    const [margin, setMargin] = useState(false)
    // console.log("DATA", DATA);
    let temp = Object.values(selectedValues)
    return (
        <TouchableOpacity onPress={() => Keyboard.dismiss()} style={{ borderRadius: 9.5 }}>
            <View style={{ backgroundColor: '#fff', elevation: 2, borderRadius: 9.5, marginVertical: 10 }}>
                {/* <View style={styles.ButtonStyle}>
                    <Text style={styles.Title1Style}>
                        {floatingLabel}
                    </Text>
                </View> */}
                <DropDownPicker
                    globalTextStyle={{
                        fontFamily: "AvenirNext-Regular",
                        fontSize: FONTSIZE.Text30
                    }}
                    min={0}
                    max={5}

                    multiple={multiple}
                    multipleText={`${temp}`}
                    selectedLabelStyle={{
                        color: '#1FAEF7'
                    }}
                    activeLabelStyle={{ color: '#1FAEF7' }}
                    items={DATA}
                    style={{ backgroundColor: '#fff', borderWidth: 0, borderRadius: 9.5 }}
                    dropDownStyle={{ minHeight: 301 }}
                    placeholder={`Select ${floatingLabel}`}
                    onOpen={() => {
                        Keyboard.dismiss()
                        setMargin(true)
                        setTimeout(() => {
                            cb()
                        }, 100);
                    }}

                    onClose={() => setMargin(false)}
                    defaultValue={value}
                    containerStyle={{ height: 60, flex: 1, flexGrow: 1, borderRadius: 9.5 }}
                    labelStyle={{
                        fontFamily: "AvenirNext-Regular",
                        fontSize: FONTSIZE.Text15,
                        color: '#000',

                    }}
                    selectedLabelStyle={{
                        color: '#000',
                        // fontWeight: 'bold',
                        // fontFamily:'Roboto-Bold',
                        fontSize: FONTSIZE.Text15,
                    }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                    }}

                    onChangeItem={onChange}
                />
                {
                    showMargin && margin &&
                    <View style={{ marginTop: 300 }} />

                }
            </View>
        </TouchableOpacity>

    )
}
export default CustomDropdown;


const styles = StyleSheet.create({
    TextInputStyle: {
        marginTop: -10,
        color: '#000',
        fontWeight: 'bold',
        fontSize: FONTSIZE.Text17,
        fontFamily: 'AvenirNext-Regular',
    },
    ContainerStyle: {
        width: '100%',

    },
    ButtonStyle: {
        marginTop: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'flex-start',
        // paddingLeft: 10,
        paddingTop: 5,
        // paddingBottom:-10
    },
    Title1Style: {

        marginLeft: 10,
        fontSize: FONTSIZE.Text15,
        // opacity: 0.7,
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
