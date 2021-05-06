import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Root,
    CustomButton
} from '@components'
import RadialGradient from 'react-native-radial-gradient';
import {
    Apple,
    Insta,
    Google,
} from '@svg'
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchVendorData, } from "../../../reducer/mainexpensecategory";
import { FONTSIZE } from '@utils'
import { ScrollView } from 'react-native';

export default function LoginScreen(props) {
    const {
        navigation
    } = props
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async () => {

        if (name.length > 0) {
            navigation.navigate("Username", {
                name: name
            })
        } else {
            ToastAndroid.show("Please enter your name!")

        }
    }
    return (
        <Root>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>{"What’s your name?"}</Text>
                    <View style={{ marginVertical: 40 }}>
                        <TextInput
                            placeholder={"Name"}
                            style={styles.textInput}
                            onChangeText={(value) => setName(value)}
                            value={name}
                        // placeholderTextColor={"#000"}
                        />
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                        <CustomButton
                            linear
                            bar
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
    },
    HeadingStyle: {
        marginTop: 40,
        fontFamily: 'Avenir Next',
        letterSpacing: 1.6,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text26,
        fontWeight: 'bold',
    },
    signStyle: {
        fontFamily: 'Avenir Next',
        letterSpacing: 1,
        color: '#000',
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomColor: '#1FAEF7',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000'
    },
    TitleStyle: {
        fontSize: 14,
        paddingVertical: 0
    },
    Card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 100
    },
    CardContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})
